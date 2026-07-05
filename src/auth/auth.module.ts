import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseStrategy } from './supabase.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SupabaseStrategy],
})
export class AuthModule {}