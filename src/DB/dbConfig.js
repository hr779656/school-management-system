const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

const startDB = async () => {
  try {
    await prisma.$connect();
    console.log('Connected with Local PostgresSQL');
  } catch (error) {
    console.log(error);
    console.log('Error connecting with Local PostgresSQL');
  }
};
module.exports = { prisma, startDB };
