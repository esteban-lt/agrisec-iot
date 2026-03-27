import { prisma } from '../lib/prisma';

export class AuthRepository {

  public static findByEmail = async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
      include: { role: true }
    });
  }

  public static findById = async (id: number) => {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        isActive: true,
        role: { select: { name: true } }
      }
    });
  }
}
