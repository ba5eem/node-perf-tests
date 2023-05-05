const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const start = Date.now()

function connect(){
  prisma.$connect()
  .then(() => {
    console.log('Connected to the database');
    console.log('Prisma:', Date.now() - start);
    prisma.$disconnect();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
    prisma.$disconnect();
  })
}

function create(){
    prisma.users.create({
    data: {
      name: 'Prisma User',
    },
  })
    .then((result) => {
      console.log('New user:', result);
      console.log('Prisma create:', Date.now() - start);
      prisma.$disconnect();
    })
    .catch((error) => {
      console.error('Error inserting user record', error);
      prisma.$disconnect();
    });
}

function update(id){
  prisma.users.update({
    where: {
      id: id,
    },
    data: {
      name: 'Prisma User updated',
    },
  })
    .then((result) => {
      console.log(`Updated user with ID ${result.id}`);
      console.log('Updated user:', result);
      console.log('Prisma updated:', Date.now() - start);
      prisma.$disconnect();
    })
    .catch((error) => {
      console.error('Error updating user record', error);
      prisma.$disconnect();
  });
}


// connect()
//create()
update(22)