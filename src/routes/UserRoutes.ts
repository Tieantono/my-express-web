import express from 'express';
import authMiddleware from '../middlewares/AuthMiddleware';

/**
 * Register the related user routes (i.e. user info).
 * @param app 
 */
export const registerUserRoutes = (app: express.Express) => {
    // User info endpoint.
    app.get('/user-info', authMiddleware, async (__req, res) => {
        res.send({ detail: 'User authenticated' });
    });
};
