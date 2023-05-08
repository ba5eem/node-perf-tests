
const OS = require('os')
const { Sequelize } = require('sequelize');
//process.env.UV_THREADPOOL_SIZE = OS.cpus().length
//console.log(OS.cpus().length) // how many cores system has


const start = Date.now()



const sequelize = new Sequelize('postgres', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});


const User = sequelize.define(
  "users",
  { name: Sequelize.STRING },
  { timestamps: false }
);


function connect(){
  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    console.log('sequelize connect:', Date.now() - start);
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
}

function create(){
  User.create({
      name: 'Sequelize User',
    })
  .then((result) => {
    console.log('New user:');
    console.log('sequelize create:', Date.now() - start);

  })
  .catch((error) => {
    console.error('Error inserting user record');
  });

}



function update(){
  User.update({ name: 'Sequelize updated User' }, { where: { name: 'Sequelize User' } })
  .then(() => {

    console.log('sequelize updated create:', Date.now() - start);
    sequelize.close();
  })
  .catch((error) => {
    console.error('Error updating user record', error);
    sequelize.close();
  });
}


// connect()
// create()
update()