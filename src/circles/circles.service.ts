import { Injectable } from '@nestjs/common';

@Injectable()
export class CirclesService {
  myCircles() { return []; }
  verify() { return { success: true }; }
}