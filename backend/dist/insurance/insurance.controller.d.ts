import { InsuranceService } from './insurance.service';
export declare class InsuranceController {
    private insuranceService;
    constructor(insuranceService: InsuranceService);
    trigger(): {
        success: boolean;
    };
    active(): {
        status: string;
    };
}
