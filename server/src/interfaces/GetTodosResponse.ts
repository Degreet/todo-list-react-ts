import { ITodo } from './ITodo'

export interface GetTodosResponse {
  data: {
    todos?: ITodo[] | null
  }
}