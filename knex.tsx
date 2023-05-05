
const OS = require('os')
//process.env.UV_THREADPOOL_SIZE = OS.cpus().length
//console.log(OS.cpus().length) // how many cores system has

const start = Date.now()

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'postgres',
  },
});

const newUser = {
  name: 'Knex user'
};
const newName = 'Knex user updated';

function connect(){
  knex.raw('SELECT 1+1 AS result')
  .then(() => {
    console.log('Connected to the database');
    console.log('Knex:', Date.now() - start);
    knex.destroy();
  })
  .catch((error) => {
    console.error('Error connecting to the database', error)
    knex.destroy();
  })
  
}

function create(){
  knex('users')
  .insert(newUser)
  .returning(['id', 'name'])
  .then((result) => {
    console.log('New user:', result[0]);
    console.log('Knex new user:', Date.now() - start);
    knex.destroy();
  })
  .catch((error) => {
    console.error('Error inserting user record', error);
    knex.destroy();
  });
}



function update(){

knex('users')
  .where('name', 'Knex user')
  .update({ name: newName })
  .returning(['id', 'name'])
  .then((result) => {
    console.log('Updated user:', result[0]);
    console.log('Knex updated user:', Date.now() - start);
    knex.destroy();
  })
  .catch((error) => {
    console.error('Error updating user record', error);
    knex.destroy();
  });
}

//connect()
// create()
update()
