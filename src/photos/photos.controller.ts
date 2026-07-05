import { Controller, Post, Get } from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Post('submit')
  submit() { return this.photosService.submit(); }

  @Get('history')
  history() { return this.photosService.history(); }
}