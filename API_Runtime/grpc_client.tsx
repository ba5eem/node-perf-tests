const grpc = require('grpc')

// Create a gRPC client
const helloProto = grpc.load('hello.proto')
const client = new helloProto.hello.Greeter('localhost:50051', grpc.credentials.createInsecure())

// Call the gRPC service
const name = 'John'
client.sayHello({ name }, (err, response) => {
  if (err) {
    console.error(err)
  } else {
    console.log(response.message)
  }
})
