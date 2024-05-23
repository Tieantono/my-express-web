import { createSecretKey } from 'crypto';
import { SignJWT, jwtVerify } from 'jose';
import UserData from '../interfaces/UserData';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Create JWT.
 * @param user 
 * @returns 
 */
export async function createJwt(user: UserData) {
    const secretKey = createSecretKey(process.env.JWT_SECRET as string, 'utf-8');
    
    const token = await new SignJWT({
        id: user.username
    })
    .setProtectedHeader({
        alg: 'HS256'
    })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER as string)
    .setAudience(process.env.JWT_AUDIENCE as string)
    .setExpirationTime('1m')
    .sign(secretKey);

    return token;
}

/**
 * Verify JWT.
 * @param token 
 * @returns 
 */
export async function verifyJwt(token: string) {
    const secretKey = createSecretKey(process.env.JWT_SECRET as string, 'utf-8');
    const result = await jwtVerify(token, secretKey, {
        issuer: process.env.JWT_ISSUER as string,
        audience: process.env.JWT_AUDIENCE as string,
    });

    return result;
}