import express, { Request, Response } from 'express';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript!');
});

export default app;
