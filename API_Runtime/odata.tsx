const odata = require('odata-v4-server')
const { createConnection } = require('typeorm')

// Define the database connection
const connection = await createConnection({
  type: 'sqlite',
  database: 'data.db',
  entities: [Todo],
  synchronize: true,
})

// Define the Todo entity
class Todo {
  constructor(id, title, completed) {
    this.id = id
    this.title = title
    this.completed = completed
  }
}

// Define the Todo OData controller
class TodoController {
  async find(filter) {
    const todoRepository = connection.getRepository(Todo)
    return todoRepository.find(filter)
  }

  async findOne(id) {
    const todoRepository = connection.getRepository(Todo)
    return todoRepository.findOne(id)
  }

  async create(data) {
    const todoRepository = connection.getRepository(Todo)
    const todo = new Todo(
      data.id,
      data.title,
      data.completed
    )
    await todoRepository.save(todo)
    return todo
  }

  async update(id, data) {
    const todoRepository = connection.getRepository(Todo)
    const todo = await todoRepository.findOne(id)
    if (!todo) {
      throw new Error(`Todo not found with ID ${id}`)
    }
    todo.title = data.title || todo.title
    todo.completed = data.completed ?? todo.completed
    await todoRepository.save(todo)
    return todo
  }

  async delete(id) {
    const todoRepository = connection.getRepository(Todo)
    const todo = await todoRepository.findOne(id)
    if (!todo) {
      throw new Error(`Todo not found with ID ${id}`)
    }
    await todoRepository.remove(todo)
  }
}

// Create and start the OData server
const server = odata('sqlite')
server.model('Todo', TodoController)
server.start()

console.log('OData server started on port 3000')
