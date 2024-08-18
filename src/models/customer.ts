import mongoose, { Document, model, Schema } from 'mongoose';

export interface ICustomer {
    email: string;
    financeApproved: boolean;
    joined: Date;
}

export interface Customer {
    id: string;
    email: string;
    financeApproved: boolean;
    joined: Date;
}

export interface ICustomerDocument extends ICustomer, Document {}

const customerSchema = new Schema<ICustomerDocument>(
    {
        email: { 
            type: String,
        },
        financeApproved: {
            type: Boolean,
            default: null,
        },
        joined: {
            type: Date,
            default: Date.now(),
        },
    },
    { collection: 'customers' },
);

export const CustomerModel = model<ICustomerDocument>('Customer', customerSchema);