import { prisma } from '../src/lib/prisma';

async function seed() {

  const roleProductor = await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: { name: 'PRODUCTOR' }
  });

  const roleOperador = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: { name: 'OPERADOR' }
  });

  await prisma.user.upsert({
    where: { email: 'productor@agrisec.com' },
    update: {},
    create: {
      name: 'Productor AgriSec',
      email: 'productor@agrisec.com',
      password: await Bun.password.hash('productor123'),
      roleId: roleProductor.id
    }
  });

  await prisma.user.upsert({
    where: { email: 'operador@agrisec.com' },
    update: {},
    create: {
      name: 'Operador AgriSec',
      email: 'operador@agrisec.com',
      password: await Bun.password.hash('operador123'),
      roleId: roleOperador.id
    }
  });

  console.log('Seed completed');
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
