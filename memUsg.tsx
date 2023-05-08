const crypto = require('crypto');
const bcrypt = require('bcrypt');
const argon2 = require('argon2');
const { performance } = require('perf_hooks');

// Define the parameters for pbkdf2
const password = 'password';
const salt = 'salt';
const iterations = 100000;
const keyLength = 64;
const algorithm = 'sha512';


const hashLength = 64;
const memoryCost = 12; // Controls the number of memory rounds

// Measure the memory usage before running pbkdf2
const startMemoryUsage = process.memoryUsage().heapUsed;

function pdkdftMemUsage(){
  // Run pbkdf2
  crypto.pbkdf2(password, salt, iterations, keyLength, algorithm, (err, derivedKey) => {
    if (err) throw err;

    // Measure the memory usage after running pbkdf2
    const endMemoryUsage = process.memoryUsage().heapUsed;

    // Calculate the difference in memory usage
    const memoryUsed = endMemoryUsage - startMemoryUsage;

    console.log(`pbkdf2 used approximately ${memoryUsed} bytes of memory.`);
  });
}


function bkryptMemUsage(){
    let bcryptStart = performance.now();
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    let bcryptEnd = performance.now();
    console.log(`bcrypt: ${bcryptEnd - bcryptStart} ms`);
  }, memoryCost);

  // Measure the memory usage after running pbkdf2
    const endMemoryUsage = process.memoryUsage().heapUsed;

    // Calculate the difference in memory usage
    const memoryUsed = endMemoryUsage - startMemoryUsage;

    console.log(`bcrypt used approximately ${memoryUsed} bytes of memory.`);
}
// bkryptMemUsage()



// Benchmark argon2
const hashingConfig = { // based on OWASP cheat sheet recommendations (as of March, 2022)
    parallelism: 1,
    memoryCost: memoryCost*1000, // mb
    timeCost: 3 // number of itetations
}

function argMemUsage() {
  let argon2Start = performance.now();
  let salt = crypto.randomBytes(16);
  argon2.hash(password, {
      ...hashingConfig,
      salt,
  }).then(res => {
    let argon2End = performance.now();
    console.log(`argon2: ${argon2End - argon2Start} ms`);
        // Measure the memory usage after running pbkdf2
    const endMemoryUsage = process.memoryUsage().heapUsed;

    // Calculate the difference in memory usage
    const memoryUsed = endMemoryUsage - startMemoryUsage;

    console.log(`argon used approximately ${memoryUsed} bytes of memory.`);
  }).catch(e => console.log(e))


}

argMemUsage();

