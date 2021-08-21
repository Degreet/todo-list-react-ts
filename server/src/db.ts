import { ITodo } from './interfaces/ITodo'

interface Db {
  todos: ITodo[]
}

const db: Db = {
  todos: []
}

export default db
