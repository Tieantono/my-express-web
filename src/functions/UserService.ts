import { FieldPacket, QueryResult } from "mysql2";
import mysqlPool from "../MySqlPool";
import RegisterForm from '../interfaces/RegisterForm';
import UserData from '../interfaces/UserData';
import { hashString } from "./BCryptService";

/**
 * Check existing user in the database.
 * @param username 
 * @returns 
 */
export async function checkExistingUser(username: string): Promise<{rowsLength: number, hasError: boolean}> {
    let [rows, fields]: [QueryResult, FieldPacket[]] = [[], []];

    try {
        [rows, fields] = await mysqlPool.query(`SELECT 1
        FROM users
        WHERE username = ?`,
    [username]);
    } catch (err) {
        console.error(err);
        return {
            rowsLength: 0,
            hasError: true
        };
    }

    return {
        rowsLength: (rows as []).length,
        hasError: false
    };
}

/**
 * Add new user to the database.
 * @param registerForm 
 * @returns 
 */
export async function addUser(registerForm: RegisterForm): Promise<{hasError: boolean}> {
    const hashedPassword = await hashString(registerForm.password);

    try {
        await mysqlPool.execute(`INSERT INTO users (username, password)
        VALUES (?, ?)`,
    [registerForm.username, hashedPassword]);
    } catch (err) {
        console.error(err);
        return {
            hasError: true
        };
    }

    return {
        hasError: false
    };
}

/**
 * Get user data from the database.
 * @param username 
 * @param password 
 * @returns 
 */
export async function getUser(username: string, password: string): Promise<{user: UserData, hasError: boolean}> {
    let [rows, fields]: [QueryResult, FieldPacket[]] = [[], []];

    try {
        [rows, fields] = await mysqlPool.query(`SELECT username, password
        FROM users
        WHERE username = ?`,
    [username, password]);
    } catch (err) {
        console.error(err);
        return {
            user: {
                username: '',
                password: ''
            },
            hasError: true
        };
    }

    return {
        user: (rows as UserData[])[0],
        hasError: false
    };
}