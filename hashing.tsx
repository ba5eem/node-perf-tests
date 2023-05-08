const crypto = require('crypto');
const bcrypt = require('bcrypt');

const argon2 = require('argon2');

const password = 'your-password-here';
const salt = crypto.randomBytes(16);

async function measureExecutionTime(fn, ...args) {
  const start = process.hrtime.bigint();
  await fn(...args);
  const end = process.hrtime.bigint();
  return Number(end - start) / 1e6; // return time in milliseconds
}

(async () => {
  // PBKDF2
  const pbkdf2Rounds = 10000;
  const pbkdf2Time = await measureExecutionTime(
    crypto.pbkdf2,
    password,
    salt,
    pbkdf2Rounds,
    64,
    'sha512'
  );
  console.log(`PBKDF2 execution time: ${pbkdf2Time} ms`);



 // Bcrypt
  const bcryptRounds = 10;
  const bcryptTime = await measureExecutionTime(
    bcrypt.hash,
    password,
    bcryptRounds
  );
  console.log(`Bcrypt execution time: ${bcryptTime} ms`);

//  Argon2
  const argon2Time = await measureExecutionTime(argon2.hash, password);
  console.log(`Argon2 execution time: ${argon2Time} ms`);
})();
