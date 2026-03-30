import { ReadingsRepository } from './repository';

interface SensorPayload {
  node_id: string;
  temperature: number;
  humidity: number;
}

const THRESHOLDS = {
  temperature: { min: -10, max: 60 },
  humidity: { min: 0, max: 100 },
};

export class ReadingsService {

  private static isAnomaly = (temperature: number, humidity: number): boolean => {
    return (
      temperature < THRESHOLDS.temperature.min ||
      temperature > THRESHOLDS.temperature.max ||
      humidity < THRESHOLDS.humidity.min ||
      humidity > THRESHOLDS.humidity.max
    );
  };

  public static save = async (payload: SensorPayload) => {
    const { node_id, temperature, humidity } = payload;

    if (!node_id || temperature === undefined || humidity === undefined) {
      throw new Error('INVALID_PAYLOAD');
    }

    const isAnomaly = ReadingsService.isAnomaly(temperature, humidity);

    const reading = await ReadingsRepository.create({
      nodeId: node_id,
      temperature,
      humidity,
      isAnomaly,
    });

    if (isAnomaly) {
      console.warn(`[ANOMALY] Nodo ${node_id} — temp: ${temperature}, humedad: ${humidity}`);
    }

    return reading;
  };

  public static getAll = async (filters: { nodeId?: string; isAnomaly?: boolean; limit?: number } = {}) => {
    return ReadingsRepository.findAll(filters);
  };

  public static getAnomalies = async () => {
    return ReadingsRepository.findAnomalies();
  };
}
