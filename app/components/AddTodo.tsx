import { NextPage } from 'next'
import classes from '../styles/AddTodo.module.scss'
import { ChangeEvent, ChangeEventHandler, MouseEventHandler, useCallback, useState } from 'react'

interface Props {
  onAdd: (title: string) => Promise<void>
}

const AddTodo: NextPage<Props> = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('')

  const changeTitleHandler: ChangeEventHandler = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }, [setTitle])

  const addHandler: MouseEventHandler = useCallback(() => {
    onAdd(title)
    setTitle('')
  }, [onAdd, title])

  return (
    <>
      <div className={classes.addTodo__list}>
        <input
          type="text"
          placeholder="Название"
          onChange={changeTitleHandler}
          value={title}
        />
        <button
          className="btn btn-success"
          onClick={addHandler}
        >Добавить</button>
      </div>
    </>
  )
}

export default AddTodo
