import { Injectable } from '@nestjs/common';

@Injectable()
export class InsuranceService {
  trigger() { return { success: true }; }
  active() { return { status: 'Active' }; }
}