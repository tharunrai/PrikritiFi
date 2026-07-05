import { Controller, Post, Get } from '@nestjs/common';
import { InsuranceService } from './insurance.service';

@Controller('insurance')
export class InsuranceController {
  constructor(private insuranceService: InsuranceService) {}

  @Post('trigger')
  trigger() { return this.insuranceService.trigger(); }

  @Get('active')
  active() { return this.insuranceService.active(); }
}