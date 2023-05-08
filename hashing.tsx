const crypto = require('crypto');
const bcrypt = require('bcrypt');
const argon2 = require('argon2');
const { performance } = require('perf_hooks');

// Parameters for the benchmarks
const password = 'password';
const salt = 'salt';
const iterations = 100000;
const hashLength = 64;
const memoryCost = 12; // Controls the number of memory rounds

// Benchmark pbkdf2
function pbkdft(){
  let pbkdf2Start = performance.now();
  crypto.pbkdf2(password, salt, iterations, hashLength, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    let pbkdf2End = performance.now();
    console.log(`pbkdf2: ${pbkdf2End - pbkdf2Start} ms`);
  });
}

// // // Benchmark bcrypt
function bkrypt(){
  let bcryptStart = performance.now();
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    let bcryptEnd = performance.now();
    console.log(`bcrypt: ${bcryptEnd - bcryptStart} ms`);
  });
}


// Benchmark argon2
const hashingConfig = { // based on OWASP cheat sheet recommendations (as of March, 2022)
    parallelism: 1,
    memoryCost: 64000, // mb
    timeCost: 100 // number of itetations
}
function hashArgon() {
    let argon2Start = performance.now();
    let salt = crypto.randomBytes(16);
    argon2.hash(password, {
        ...hashingConfig,
        salt,
    }).then(res => {
      let argon2End = performance.now();
      console.log(`argon2: ${argon2End - argon2Start} ms`);
    }).catch(e => console.log(e))
}



process.argv[2] === "pbk" ? pbkdft() : null
process.argv[2] === "bkr" ? bkrypt() : null
process.argv[2] === "arg" ? hashArgon() : null

