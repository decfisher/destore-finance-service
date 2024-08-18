import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { CustomerModel } from './models/customer';
import { FinanceDao } from './dao/FinanceDao';
import { FinanceController } from './controllers/FinanceController';
import mongoose from 'mongoose';

// Get environment variables
const port = process.env.PORT || 3002;
const MONGO_DB_URI: string = process.env.DB_URI!;

// Connect to inventory database
mongoose.connect(MONGO_DB_URI)
  .then(() => console.log('✅ Connected to customer database'))
  .catch(error => {
    console.log('❌ Failed to connect to customer database');
    console.error(error);
  });

// Initialise data accessors
const financeDao = new FinanceDao(CustomerModel);

// Initialise controllers
const financeController = new FinanceController(financeDao);

// Initialise application server
const app = express();

// Routes
app.get('/not-approved', financeController.getAllNonApprovedCustomers);

app.get('/get-decision/:id', financeController.getFinanceDecision);

// Start the server
app.listen(port, () => {
    console.log(`🛜 Finance service running on port ${port}...`);
})