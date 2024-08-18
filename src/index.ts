import express, { Request, Response } from 'express';

// Get environment variables
const port = process.env.PORT || 3002;

// Initialise application server
const app = express();

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`🛜 Inventory service running on port ${port}...`);
})