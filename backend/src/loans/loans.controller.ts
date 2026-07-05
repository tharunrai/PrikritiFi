import { Controller, Post, Get } from '@nestjs/common';
import { LoansService } from './loans.service';

@Controller('loans')
export class LoansController {
  constructor(private loansService: LoansService) {}

  @Post('apply')
  apply() { return this.loansService.apply(); }

  @Get('my')
  myLoans() { return this.loansService.myLoans(); }
}