import type { Request, Response } from 'express';
import { ActuatorsService } from './service';

export class ActuatorsController {

  public static trigger = async (request: Request, response: Response) => {
    try {
      const { actuatorId, action } = request.body;

      if (!actuatorId || !action) {
        response.status(400).json({ ok: false, message: 'actuatorId and action are required' });
        return;
      }

      const log = await ActuatorsService.trigger({
        userId: request.user!.id,
        actuatorId,
        action,
      });

      response.status(201).json({ ok: true, data: log });
    } catch (error: any) {
      switch (error.message) {
        case 'INVALID_ACTION':
          response.status(400).json({ ok: false, message: 'Action must be ON or OFF' });
          break;
        default:
          response.status(500).json({ ok: false, message: error.message });
      }
    }
  };

  public static getLogs = async (_request: Request, response: Response) => {
    try {
      const logs = await ActuatorsService.getLogs();
      response.status(200).json({ ok: true, data: logs });
    } catch (error: any) {
      response.status(500).json({ ok: false, message: error.message });
    }
  };
}
