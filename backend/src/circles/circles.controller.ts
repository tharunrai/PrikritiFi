import { Controller, Post, Get } from '@nestjs/common';
import { CirclesService } from './circles.service';

@Controller('circles')
export class CirclesController {
  constructor(private circlesService: CirclesService) {}

  @Get('my')
  myCircles() { return this.circlesService.myCircles(); }

  @Post('verify')
  verify() { return this.circlesService.verify(); }
}