import type { Request, Response } from 'express';
import { AuthService } from './service';

export class AuthController {

  static login = async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body as any;
      const result = await AuthService.login({ email, password });
      return response.status(200).json(result);
    }
    catch(error: any) {
      return response.status(error?.status ?? 500).json({ ok: false, message: error.message });
    }
  }
}
