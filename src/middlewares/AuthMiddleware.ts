import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../functions/JwtService';

/**
 * Authentication middleware for automatic JWT verification.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({detail: 'Unauthorized'});;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({detail: 'Unauthorized'});;
    }

    try {
        const result = await verifyJwt(token);
        console.log(result);
    } catch (err) {
        console.error(err);
        res.status(401).send({detail: 'Unauthorized'});
        return;
    }

    next();
}

export default authMiddleware;