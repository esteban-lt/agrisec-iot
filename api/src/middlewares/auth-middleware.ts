import type { Request, Response, NextFunction } from 'express';
import { JWT, type JWTPayload } from '../config/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export class AuthMiddleware {

  static requireAuth = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        response.status(401).json({ ok: false, message: 'Not authenticated' });
        return;
      }

      const token = authHeader.split(' ')[1];
      const payload = JWT.verifyToken(token!);

      if (!payload) {
        response.status(401).json({ ok: false, message: 'Invalid or expired token' });
        return;
      }

      request.user = payload;
      next();
    }
    catch {
      response.status(401).json({ ok: false, message: 'Not authenticated' });
    }
  }

  static requireRole = (role: string) => {
    return (request: Request, response: Response, next: NextFunction) => {
      if (request.user?.role !== role) {
        response.status(403).json({ ok: false, message: 'Not authorized' });
        return;
      }
      next();
    }
  }
}
