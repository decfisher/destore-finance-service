import { Request, Response, NextFunction } from 'express';
import { FinanceDao } from '../dao/FinanceDao';

export class FinanceController {
    private financeDao: FinanceDao;

    constructor(financeDao: FinanceDao) {
        this.financeDao = financeDao;
    }

    getAllNonApprovedCustomers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customers = await this.financeDao.getAllCustomersWithoutApproval();
            res.status(200).json(customers);
        } catch (error) {
            next(error);
        }
    }

    getFinanceDecision = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const decision = await this.financeDao.getFinanceDecision(id);
            res.status(200).json(decision);
        } catch (error) {
            next(error);
        }
    }
}