import { LoansService } from './loans.service';
export declare class LoansController {
    private loansService;
    constructor(loansService: LoansService);
    apply(): {
        success: boolean;
    };
    myLoans(): any[];
}
