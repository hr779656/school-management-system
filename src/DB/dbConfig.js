const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({

});

const startDB = async () => {
  try {
    await prisma.$connect();
    console.log('Connected with Local PostgresSQL');
  } catch (error) {
    console.error('Error connecting with Local PostgresSQL:');
  }
};
module.exports = { prisma, startDB };
