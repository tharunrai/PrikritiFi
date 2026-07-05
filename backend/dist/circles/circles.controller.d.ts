import { CirclesService } from './circles.service';
export declare class CirclesController {
    private circlesService;
    constructor(circlesService: CirclesService);
    myCircles(): any[];
    verify(): {
        success: boolean;
    };
}
