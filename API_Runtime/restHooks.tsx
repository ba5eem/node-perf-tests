const express = require('express')
const bodyParser = require('body-parser')

//  REST Hooks is a good choice for applications that require real-time updates, but do not need low latency or bidirectional communication.

// Socket.IO is a good choice for applications that require low latency and bidirectional communication

const app = express()

// Define the resource endpoint
app.post('/resource', bodyParser.json(), (req, res) => {
  const resource = req.body

  // Handle the resource creation
  // ...

  // Notify the subscribers
  const subscribers = /* get subscribers for the resource */;
  subscribers.forEach(subscriber => {
    // Push the resource to the subscriber
    // ...
  })

  res.status(201).send('Resource created')
})

// Define the subscription endpoint
app.post('/subscribe', bodyParser.json(), (req, res) => {
  const subscriber = req.body

  // Save the subscriber to the database
  // ...

  res.status(201).send('Subscribed')
})

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
