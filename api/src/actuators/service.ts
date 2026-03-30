import { ActuatorsRepository } from './repository';

interface TriggerActuatorDTO {
  userId: number;
  actuatorId: string;
  action: 'ON' | 'OFF';
}

export class ActuatorsService {

  public static trigger = async (dto: TriggerActuatorDTO) => {
    if (!['ON', 'OFF'].includes(dto.action)) {
      throw new Error('INVALID_ACTION');
    }

    return ActuatorsRepository.create({
      userId: dto.userId,
      actuatorId: dto.actuatorId,
      action: dto.action,
      source: 'MANUAL',
    });
  };

  public static getLogs = async () => {
    return ActuatorsRepository.findAll();
  };
}
