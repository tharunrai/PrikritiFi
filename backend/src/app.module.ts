import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';
import { LoansModule } from './loans/loans.module';
import { InsuranceModule } from './insurance/insurance.module';
import { CirclesModule } from './circles/circles.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, PhotosModule, LoansModule, InsuranceModule, CirclesModule],
})
export class AppModule {}