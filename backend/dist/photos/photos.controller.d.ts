import { PhotosService } from './photos.service';
export declare class PhotosController {
    private photosService;
    constructor(photosService: PhotosService);
    submit(): {
        success: boolean;
    };
    history(): any[];
}
