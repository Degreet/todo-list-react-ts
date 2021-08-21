import { ITodo } from './ITodo'

export interface TodosActionResponse {
  data: {
    success?: boolean
    todo?: ITodo
    todos?: ITodo[]
  }
}