import { NextPage } from 'next'
import { ITodo } from '../../server/src/interfaces/ITodo'
import { TodosActionResponse } from '../../server/src/interfaces/TodosActionResponse'
import { GetTodosResponse } from '../../server/src/interfaces/GetTodosResponse'
import classes from '../styles/Home.module.scss'
import { useCallback, useState } from 'react'
import Todo from '../components/Todo'
import axios from 'axios'
import AddTodo from '../components/AddTodo'

interface Props {
  todos?: ITodo[] | null
}

const Home: NextPage<Props> = ({ todos: serverTodos }: Props) => {
  const [todos, setTodos] = useState(serverTodos)

  const removeHandler = useCallback(async (id: string) => {
    try {
      const json: TodosActionResponse = await axios.post('/todos/remove', { id })
      setTodos(json.data.todos)
    } catch {}
  }, [axios, setTodos])

  const addHandler = useCallback(async (title: string): Promise<void> => {
    try {
      const json: TodosActionResponse = await axios.post('/todos/add', { title })
      setTodos(json.data.todos)
    } catch {}
  }, [axios, setTodos])

  return (
    <>
      <main>
        <AddTodo onAdd={addHandler} />
        <ul className={classes.todos}>
          {todos && todos.length ? todos.map(
            (todo: ITodo) => <Todo onRemove={removeHandler} key={todo.id} todo={todo} />
          ) : <p>На данный момент нет задач</p>}
        </ul>
      </main>
    </>
  )
}

Home.getInitialProps = async () => {
  const json: GetTodosResponse = await axios.get(`${process.env.API_URL}/todos`)
  return { todos: json.data.todos }
}

export default Home
