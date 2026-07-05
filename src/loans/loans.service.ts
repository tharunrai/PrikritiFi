import { Injectable } from '@nestjs/common';

@Injectable()
export class LoansService {
  apply() { return { success: true }; }
  myLoans() { return []; }
}