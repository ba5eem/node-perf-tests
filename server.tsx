const express = require('express');
const OS = require('os')
//process.env.UV_THREADPOOL_SIZE = OS.cpus().length
//console.log(OS.cpus().length) // how many cores system has
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});










app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
