import { NextPage } from 'next'
import { ITodo } from '../../server/src/interfaces/ITodo'
import { useCallback } from 'react'
import classes from '../styles/Todo.module.scss'

interface Props {
  todo: ITodo
  onRemove: Function
}

const Todo: NextPage<Props> = ({ todo, onRemove }: Props) => {
  const removeHandler = useCallback((): void => {
    onRemove(todo.id)
  }, [onRemove, todo])

  return (
    <>
      <li className={classes.todos__item}>
        <p>{todo.title}</p>
        <button className="btn btn-danger" onClick={removeHandler}>Remove</button>
      </li>
    </>
  )
}

export default Todo
