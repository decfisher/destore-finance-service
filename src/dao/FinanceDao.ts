import { Model } from 'mongoose';
import { Customer, ICustomerDocument } from '../models/customer';

export class FinanceDao {
    private model: Model<ICustomerDocument>

    constructor (model: Model<ICustomerDocument>) {
        this.model = model;
    }

    async getAllCustomersWithoutApproval(): Promise<Customer[]> {
        try {
            const customers = await this.model.find({
                financeApproved: { $nin: [ null ], },
            });

            return customers.map((customer) => {
                return {
                    id: (customer._id as unknown) as string,
                    email: customer.email,
                    financeApproved: customer.financeApproved,
                    joined: customer.joined,
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getFinanceDecision(id: string) {
        try {
            if (!id) {
                throw new Error('Customer ID is required');
            }

            const customer = await this.model.findById(id);

            if (!customer) {
                throw new Error('Customer not found');
            }

            if (customer.financeApproved !== null) {
                throw new Error('Customer finance decision has already been made');
            }

            const random = this.getRandomNumber(1000);
            const financeApproved = random % 2 === 0;

            await this.model.updateOne({ _id: id }, { financeApproved });

            return {
                financeDesicion: financeApproved,
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    private getRandomNumber(max: number): number {
        return Math.floor(Math.random() * max);
    }
}