import { prisma } from '../lib/prisma';

interface CreateReadingDTO {
  nodeId: string;
  temperature: number;
  humidity: number;
  isAnomaly: boolean;
}

interface FindReadingsFilter {
  nodeId?: string;
  isAnomaly?: boolean;
  limit?: number;
}

export class ReadingsRepository {

  public static create = async (data: CreateReadingDTO) => {
    return prisma.sensorReading.create({ data });
  };

  public static findAll = async (filters: FindReadingsFilter = {}) => {
    return prisma.sensorReading.findMany({
      where: {
        ...(filters.nodeId && { nodeId: filters.nodeId }),
        ...(filters.isAnomaly !== undefined && { isAnomaly: filters.isAnomaly }),
      },
      orderBy: { recordedAt: 'desc' },
      take: filters.limit ?? 100,
    });
  };

  public static findAnomalies = async () => {
    return prisma.sensorReading.findMany({
      where: { isAnomaly: true },
      orderBy: { recordedAt: 'desc' },
      take: 50,
    });
  };
}
