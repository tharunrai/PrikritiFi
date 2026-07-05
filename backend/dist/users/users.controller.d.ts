import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(): {
        id: string;
        prakriti_score: number;
    };
    updateScore(): {
        success: boolean;
    };
}
