import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Function to hash a password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // The higher the number, the more secure the hash, but it will be slower
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Function to compare a password with a hashed password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

// Function to generate a JWT token
export function generateToken(userId: string): string {
  const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use a secure secret
  const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
  return token;
}

// Function to verify a JWT token (optional utility)
export function verifyToken(token: string): any {
  const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
