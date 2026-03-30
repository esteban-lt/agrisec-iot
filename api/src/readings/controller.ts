import type { Request, Response } from 'express';
import { ReadingsService } from './service';

export class ReadingsController {

  public static getAll = async (request: Request, response: Response) => {
    try {
      const { nodeId, isAnomaly, limit } = request.query;

      const readings = await ReadingsService.getAll({
        nodeId: nodeId as string | undefined,
        isAnomaly: isAnomaly !== undefined ? isAnomaly === 'true' : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      });

      response.status(200).json({ ok: true, data: readings });
    } catch (error: any) {
      response.status(500).json({ ok: false, message: error.message });
    }
  };

  public static getAnomalies = async (_request: Request, response: Response) => {
    try {
      const anomalies = await ReadingsService.getAnomalies();
      response.status(200).json({ ok: true, data: anomalies });
    } catch (error: any) {
      response.status(500).json({ ok: false, message: error.message });
    }
  };
}
