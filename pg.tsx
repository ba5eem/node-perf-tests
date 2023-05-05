const { Pool } = require('pg');

const start = Date.now()
const pool = new Pool({
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'postgres'
});

const newUser = {
  name: 'PG User'
};


pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connected to the database');
    console.log('PG Connect:', Date.now() - start);
    // Use the client object to insert a new user record
    const insertQuery = `
      INSERT INTO users (name)
      VALUES ($1)
      RETURNING id, name
    `;
    const insertValues = [newUser.name];
    client.query(insertQuery, insertValues, (err, res) => {
      done();
      if (err) {
        console.error('Error inserting user record', err.stack);
      } else {
        console.log('New user:', res.rows[0]);
        console.log('PG Insert:', Date.now() - start);
      }
      // End the pool after all queries are complete
    });
  }
});


const newName = 'pg user updated';

pool.query('UPDATE users SET name = $1 WHERE name = $2 RETURNING id, name', [newName, 'PG User'])
  .then((result) => {
    console.log('Updated user:', result.rows[0]);
    console.log('PG Updated:', Date.now() - start);
    pool.end();
  })
  .catch((error) => {
    console.error('Error updating user record', error);
    pool.end();
  });