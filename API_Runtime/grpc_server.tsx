const grpc = require('grpc')

// Define the gRPC service
const helloProto = grpc.load('hello.proto')
const helloService = {
  sayHello: function(call, callback) {
    const name = call.request.name
    const message = `Hello, ${name}!`
    callback(null, { message })
  }
}

// Create and start the gRPC server
const server = new grpc.Server()
server.addService(helloProto.hello.Greeter.service, helloService)
server.bind('localhost:50051', grpc.ServerCredentials.createInsecure())
server.start()

console.log('gRPC server started on port 50051')
