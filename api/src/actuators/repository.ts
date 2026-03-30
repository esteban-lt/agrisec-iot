import { prisma } from '../lib/prisma';

interface CreateActuatorLogDTO {
  userId?: number;
  actuatorId: string;
  action: string;
  source: string;
}

export class ActuatorsRepository {

  public static create = async (data: CreateActuatorLogDTO) => {
    return prisma.actuatorLog.create({ data });
  };

  public static findAll = async () => {
    return prisma.actuatorLog.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  };
}
