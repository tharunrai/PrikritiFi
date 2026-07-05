import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getMe() { return { id: 'mock', prakriti_score: 75 }; }
  updateScore() { return { success: true }; }
}