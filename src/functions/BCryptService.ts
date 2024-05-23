import bcrypt from 'bcrypt';

/**
 * Hash a string using BCrypt algorithm.
 * @param inputString 
 * @returns 
 */
export async function hashString(inputString: string): Promise<string> {
    const saltRounds = 10;
    const hashedString = await bcrypt.hash(inputString, saltRounds);

    return hashedString;
}

/**
 * Compare input string with hashed string.
 * @param inputString 
 * @param hashedString 
 * @returns 
 */
export async function compareHashedString(inputString: string, hashedString: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(inputString, hashedString);

    return isMatch;
}