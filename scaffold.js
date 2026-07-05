const fs = require('fs');
const path = require('path');

const files = {
  'prisma/schema.prisma': `model User {
  id              String   @id @default(uuid())
  supabase_id     String   @unique
  phone           String?
  name            String?
  prakriti_score  Int      @default(50)
  created_at      DateTime @default(now())

  photo_submissions  PhotoSubmission[]
  loans              Loan[]
  insurance_claims   InsuranceClaim[]
  circle_memberships CircleMember[]
}

model PhotoSubmission {
  id          String   @id @default(uuid())
  user_id     String
  user        User     @relation(fields: [user_id], references: [id])
  result      String   // "Healthy" or "Stressed"
  confidence  Float
  location    String?  // mock Vidarbha coordinates
  tx_hash     String?
  created_at  DateTime @default(now())
}

model Loan {
  id         String   @id @default(uuid())
  user_id    String
  user       User     @relation(fields: [user_id], references: [id])
  amount     Int
  purpose    String
  status     String   @default("Active")
  tx_hash    String?
  created_at  DateTime @default(now())
}

model InsuranceClaim {
  id         String   @id @default(uuid())
  user_id    String
  user       User     @relation(fields: [user_id], references: [id])
  amount     Int
  status     String   @default("Triggered")
  tx_hash    String?
  created_at  DateTime @default(now())
}

model CircleMember {
  id                 String   @id @default(uuid())
  user_id            String
  user               User     @relation(fields: [user_id], references: [id])
  reputation_score   Int      @default(70)
  verification_count Int      @default(0)
  status             String   @default("Active")
}`,

  'contracts/PrakritiFi.sol': `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PrakritiFi {
    address public owner;
    
    event InsurancePayout(
        address indexed farmer, 
        uint256 amount, 
        uint256 timestamp
    );
    
    event CredentialMinted(
        address indexed farmer, 
        uint256 timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    function triggerInsurancePayout(
        address payable farmer, 
        uint256 amount
    ) external {
        require(msg.sender == owner, "Not authorized");
        require(
            address(this).balance >= amount, 
            "Insufficient vault balance"
        );
        farmer.transfer(amount);
        emit InsurancePayout(farmer, amount, block.timestamp);
    }

    function mintGroundTruthCredential(
        address farmer
    ) external {
        require(msg.sender == owner, "Not authorized");
        emit CredentialMinted(farmer, block.timestamp);
    }

    function fundVault() external payable {}

    receive() external payable {}
}`,

  // Backend Files
  'src/main.ts': `import { NestFactory } from '@nestjs/core';\nimport { AppModule } from './app.module';\n\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n  app.enableCors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' });\n  await app.listen(3001);\n}\nbootstrap();`,
  'src/app.module.ts': `import { Module } from '@nestjs/common';\nimport { PrismaModule } from './prisma/prisma.module';\nimport { AuthModule } from './auth/auth.module';\nimport { UsersModule } from './users/users.module';\nimport { PhotosModule } from './photos/photos.module';\nimport { LoansModule } from './loans/loans.module';\nimport { InsuranceModule } from './insurance/insurance.module';\nimport { CirclesModule } from './circles/circles.module';\n\n@Module({\n  imports: [PrismaModule, AuthModule, UsersModule, PhotosModule, LoansModule, InsuranceModule, CirclesModule],\n})\nexport class AppModule {}`,
  'src/prisma/prisma.module.ts': `import { Global, Module } from '@nestjs/common';\nimport { PrismaService } from './prisma.service';\n\n@Global()\n@Module({\n  providers: [PrismaService],\n  exports: [PrismaService],\n})\nexport class PrismaModule {}`,
  'src/prisma/prisma.service.ts': `import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';\nimport { PrismaClient } from '@prisma/client';\n\n@Injectable()\nexport class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {\n  async onModuleInit() {\n    await this.$connect();\n  }\n  async onModuleDestroy() {\n    await this.$disconnect();\n  }\n}`,
  
  'src/auth/auth.module.ts': `import { Module } from '@nestjs/common';\nimport { AuthController } from './auth.controller';\nimport { AuthService } from './auth.service';\nimport { SupabaseStrategy } from './supabase.strategy';\n\n@Module({\n  controllers: [AuthController],\n  providers: [AuthService, SupabaseStrategy],\n})\nexport class AuthModule {}`,
  'src/auth/auth.controller.ts': `import { Controller, Post } from '@nestjs/common';\nimport { AuthService } from './auth.service';\n\n@Controller('auth')\nexport class AuthController {\n  constructor(private authService: AuthService) {}\n\n  @Post('verify')\n  verifyToken() {\n    return { success: true };\n  }\n}`,
  'src/auth/auth.service.ts': `import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class AuthService {}`,
  'src/auth/supabase.strategy.ts': `import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class SupabaseStrategy {}`,

  'src/users/users.module.ts': `import { Module } from '@nestjs/common';\nimport { UsersController } from './users.controller';\nimport { UsersService } from './users.service';\n\n@Module({\n  controllers: [UsersController],\n  providers: [UsersService],\n})\nexport class UsersModule {}`,
  'src/users/users.controller.ts': `import { Controller, Get, Patch } from '@nestjs/common';\nimport { UsersService } from './users.service';\n\n@Controller('users')\nexport class UsersController {\n  constructor(private usersService: UsersService) {}\n\n  @Get('me')\n  getMe() { return this.usersService.getMe(); }\n\n  @Patch('me/score')\n  updateScore() { return this.usersService.updateScore(); }\n}`,
  'src/users/users.service.ts': `import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class UsersService {\n  getMe() { return { id: 'mock', prakriti_score: 75 }; }\n  updateScore() { return { success: true }; }\n}`,

  'src/photos/photos.module.ts': `import { Module } from '@nestjs/common';\nimport { PhotosController } from './photos.controller';\nimport { PhotosService } from './photos.service';\n\n@Module({\n  controllers: [PhotosController],\n  providers: [PhotosService],\n})\nexport class PhotosModule {}`,
  'src/photos/photos.controller.ts': `import { Controller, Post, Get } from '@nestjs/common';\nimport { PhotosService } from './photos.service';\n\n@Controller('photos')\nexport class PhotosController {\n  constructor(private photosService: PhotosService) {}\n\n  @Post('submit')\n  submit() { return this.photosService.submit(); }\n\n  @Get('history')\n  history() { return this.photosService.history(); }\n}`,
  'src/photos/photos.service.ts': `import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class PhotosService {\n  submit() { return { success: true }; }\n  history() { return []; }\n}`,

  'src/loans/loans.module.ts': `import { Module } from '@nestjs/common';\nimport { LoansController } from './loans.controller';\nimport { LoansService } from './loans.service';\n\n@Module({\n  controllers: [LoansController],\n  providers: [LoansService],\n})\nexport class LoansModule {}`,
  'src/loans/loans.controller.ts': `import { Controller, Post, Get } from '@nestjs/common';\nimport { LoansService } from './loans.service';\n\n@Controller('loans')\nexport class LoansController {\n  constructor(private loansService: LoansService) {}\n\n  @Post('apply')\n  apply() { return this.loansService.apply(); }\n\n  @Get('my')\n  myLoans() { return this.loansService.myLoans(); }\n}`,
  'src/loans/loans.service.ts': `import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class LoansService {\n  apply() { return { success: true }; }\n  myLoans() { return []; }\n}`,

  'src/insurance/insurance.module.ts': `import { Module } from '@nestjs/common';\nimport { InsuranceController } from './insurance.controller';\nimport { InsuranceService } from './insurance.service';\n\n@Module({\n  controllers: [InsuranceController],\n  providers: [InsuranceService],\n})\nexport class InsuranceModule {}`,
  'src/insurance/insurance.controller.ts': `import { Controller, Post, Get } from '@nestjs/common';\nimport { InsuranceService } from './insurance.service';\n\n@Controller('insurance')\nexport class InsuranceController {\n  constructor(private insuranceService: InsuranceService) {}\n\n  @Post('trigger')\n  trigger() { return this.insuranceService.trigger(); }\n\n  @Get('active')\n  active() { return this.insuranceService.active(); }\n}`,
  'src/insurance/insurance.service.ts': `import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class InsuranceService {\n  trigger() { return { success: true }; }\n  active() { return { status: 'Active' }; }\n}`,

  'src/circles/circles.module.ts': `import { Module } from '@nestjs/common';\nimport { CirclesController } from './circles.controller';\nimport { CirclesService } from './circles.service';\n\n@Module({\n  controllers: [CirclesController],\n  providers: [CirclesService],\n})\nexport class CirclesModule {}`,
  'src/circles/circles.controller.ts': `import { Controller, Post, Get } from '@nestjs/common';\nimport { CirclesService } from './circles.service';\n\n@Controller('circles')\nexport class CirclesController {\n  constructor(private circlesService: CirclesService) {}\n\n  @Get('my')\n  myCircles() { return this.circlesService.myCircles(); }\n\n  @Post('verify')\n  verify() { return this.circlesService.verify(); }\n}`,
  'src/circles/circles.service.ts': `import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class CirclesService {\n  myCircles() { return []; }\n  verify() { return { success: true }; }\n}`,

  // Frontend Libraries
  'lib/supabase.ts': `export const supabase = {}; // Mock Supabase client`,
  'lib/api.ts': `import axios from 'axios';\nexport const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_NESTJS_API_URL || 'http://localhost:3001' });`,
  'lib/contract.ts': `export const contract = {}; // Mock Ethers contract`,
  'lib/tensorflow.ts': `export const loadModel = async () => {};\nexport const analyzeImage = async () => { return { result: 'Healthy', confidence: 0.9 }; };`,

  // Frontend Components
  'components/PrakritScore.tsx': `export default function PrakritScore() { return <div>Score</div>; }`,
  'components/SatelliteToggle.tsx': `export default function SatelliteToggle() { return <div>Toggle</div>; }`,
  'components/CircleCard.tsx': `export default function CircleCard() { return <div>Circle Card</div>; }`,
  'components/PolicyCard.tsx': `export default function PolicyCard() { return <div>Policy Card</div>; }`,
  'components/ScoreBreakdown.tsx': `export default function ScoreBreakdown() { return <div>Breakdown</div>; }`,
  'components/ActivityFeed.tsx': `export default function ActivityFeed() { return <div>Feed</div>; }`,

  // Frontend Pages
  'app/dashboard/page.tsx': `export default function DashboardPage() { return <div>Dashboard Page</div>; }`,
  'app/upload/page.tsx': `export default function UploadPage() { return <div>Upload Page</div>; }`,
  'app/score/page.tsx': `export default function ScorePage() { return <div>Score Page</div>; }`,
  'app/loan/page.tsx': `export default function LoanPage() { return <div>Loan Page</div>; }`,
  'app/insurance/page.tsx': `export default function InsurancePage() { return <div>Insurance Page</div>; }`,
  'app/circles/page.tsx': `export default function CirclesPage() { return <div>Circles Page</div>; }`,
  'app/auth/page.tsx': `export default function AuthPage() { return <div>Auth Page</div>; }`,
};

for (const [filepath, content] of Object.entries(files)) {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filepath, content);
}

console.log("Scaffold completed.");
