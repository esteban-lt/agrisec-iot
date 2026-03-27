import jwt from 'jsonwebtoken';
import env from './env';

export interface JWTPayload {
  id: number;
  email: string;
  role: string;
}

export class JWT {

  public static signToken = (payload: JWTPayload): string => {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as any
    });
  }

  public static verifyToken = (token: string): JWTPayload | null => {
    try {
      return jwt.verify(token, env.JWT_SECRET) as JWTPayload;
    } catch {
      return null;
    }
  }
}
