import { Injectable } from '@nestjs/common';

@Injectable()
export class PhotosService {
  submit() { return { success: true }; }
  history() { return []; }
}