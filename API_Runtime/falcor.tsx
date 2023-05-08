const express = require('express')
const falcorExpress = require('falcor-express')
const falcorRouter = require('falcor-router')

// Define the Falcor model
const model = new falcor.Model({
  cache: {
    greeting: 'Hello, world!'
  }
})

// Define the Falcor router
const router = new falcorRouter([
  {
    route: 'greeting',
    get: () => {
      return { path: ['greeting'], value: model.get('greeting') }
    }
  }
])

// Create the Express app and Falcor middleware
const app = express()
app.use('/model.json', falcorExpress.dataSourceRoute(() => router))

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
