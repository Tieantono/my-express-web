import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { registerAuthRoutes } from './routes/AuthRoutes';
import { registerUserRoutes } from './routes/UserRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to automatically parse JSON request body.
app.use(express.json());

// Default home endpoint.
app.get('/', (__req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

// Register the authentication routes (login, register, etc.).
registerAuthRoutes(app);
// Register the user routes (user info, etc.).
registerUserRoutes(app);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
