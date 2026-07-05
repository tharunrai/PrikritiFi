import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    verifyToken(): {
        success: boolean;
    };
}
