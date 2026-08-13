import 'dotenv/config';
import { PrismaClient, Role, LeadStage } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clean existing data
  await prisma.activity.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create initial Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@crm.com',
      name: 'Alessandro Admin',
      password: 'password123',
      role: Role.ADMIN,
    },
  });

  // 2. Create sample Clients
  const client1 = await prisma.client.create({
    data: {
      name: 'John Doe',
      company: 'Acme Corp',
      email: 'john@acme.com',
      phone: '+1 555-0199',
    },
  });

  const client2 = await prisma.client.create({
    data: {
      name: 'Sarah Smith',
      company: 'Innovatech Solutions',
      email: 'sarah@innovatech.com',
      phone: '+1 555-0188',
    },
  });

  // 3. Create Deals associated with Clients and User
  await prisma.deal.createMany({
    data: [
      {
        title: 'Website Redesign Project',
        value: 4500.0,
        stage: LeadStage.PROPOSAL_SENT,
        clientId: client1.id,
        assignedToId: adminUser.id,
      },
      {
        title: 'Mobile App Consulting',
        value: 12000.0,
        stage: LeadStage.QUALIFIED,
        clientId: client2.id,
        assignedToId: adminUser.id,
      },
    ],
  });

  console.log('Seed executed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });