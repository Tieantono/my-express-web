import { compareHashedString } from '../functions/BCryptService';
import { createJwt } from '../functions/JwtService';
import { addUser, checkExistingUser, getUser } from '../functions/UserService';
import LoginForm from '../interfaces/LoginForm';
import RegisterForm from '../interfaces/RegisterForm';
import express from 'express';

/**
 * Register the authentication routes.
 * @param app 
 */
export const registerAuthRoutes = (app: express.Express) => {
    // Signup endpoint.
    app.post('/signup', async (req, res) => {
        let signupForm = req.body as RegisterForm;

        // Validate request body.
        if (!signupForm) {
            res.status(400).send({ detail: 'Invalid username or password' });
            return;
        }
        if (!signupForm.username || !signupForm.password) {
            res.status(400).send({ detail: 'Invalid username or password' });
            return;
        }

        // Validate whether the user is already exist or not.
        const userValidationResult = await checkExistingUser(signupForm.username);
        if (userValidationResult.hasError) {
            res.status(500).send({ detail: 'Internal server error' });
            return;
        }
        if (userValidationResult.rowsLength > 0) {
            res.status(400).send({ detail: 'Username already exists' });
            return;
        }

        // Add user to the database.
        const hasSuccessfullyAddUser = await addUser(signupForm);
        if (hasSuccessfullyAddUser.hasError) {
            res.status(500).send({ detail: 'Internal server error' });
            return;
        }

        res.status(200).send({ detail: 'User registered successfully' });
    });

    // Login endpoint.
    app.post('/login', async (req, res) => {
        let loginForm = req.body as LoginForm;

        // Validate request body.
        if (!loginForm) {
            res.status(400).send({ detail: 'Invalid username or password' });
            return;
        }
        if (!loginForm.username || !loginForm.password) {
            res.status(400).send({ detail: 'Invalid username or password' });
            return;
        }

        // Get user data from the database for validations.
        const existingUser = await getUser(loginForm.username, loginForm.password);
        if (existingUser.hasError) {
            res.status(500).send({ detail: 'Internal server error' });
            return;
        }

        // Validate user data.
        if (!existingUser.user) {
            res.status(400).send({ detail: 'Invalid username or password' });
            return;
        }

        // Validate user's password.
        const isValidPassword = await compareHashedString(loginForm.password, existingUser.user.password);
        if (!isValidPassword) {
            res.status(400).send({ detail: 'Invalid username or password' });
            return;
        }

        // Create the JWT.
        const token = await createJwt(existingUser.user);

        res.send({ token: token });
    });
};
