import { Controller, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getMe() { return this.usersService.getMe(); }

  @Patch('me/score')
  updateScore() { return this.usersService.updateScore(); }
}