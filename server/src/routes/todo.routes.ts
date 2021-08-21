import { Application, Request, Response } from 'express'
import { ITodo } from '../interfaces/ITodo'
import db from '../db'

const { Router } = require('express')
const router: Application = Router()

router.get('/', (req: Request, res: Response): void => {
  const todos: ITodo[] = db.todos
  res.json({ todos })
})

router.post('/add', (req: Request, res: Response): void => {
  const title: string | null = req.body.title
  if (!title) return

  const todo: ITodo = {
    id: Math.floor(Math.random() * 500).toString(),
    title,
    completed: false,
    dateCreate: new Date(),
  }

  db.todos.unshift(todo)
  res.json({ success: true, todo, todos: [...db.todos] })
})

router.post('/remove', (req: Request, res: Response): void => {
  const failHandler = (): void => {
    res.json({ success: false, message: 'Not found' })
  }

  const id: string | null = req.body.id
  if (!id) return failHandler()

  const todo: ITodo | undefined = db.todos.find((todo): boolean => todo.id === id)
  if (!todo) return failHandler()

  const idx: number = db.todos.indexOf(todo)
  if (idx < 0) return failHandler()

  db.todos.splice(idx, 1)
  res.json({ success: true, todos: [...db.todos] })
})

router.post('/complete', (req: Request, res: Response): void => {
  const failHandler = (): void => {
    res.json({ success: false, message: 'Not found' })
  }

  const id: string | null = req.body.id
  if (!id) return failHandler()

  const todo: ITodo | undefined = db.todos.find((todo): boolean => todo.id === id)
  if (!todo) return failHandler()

  todo.completed = !todo.completed
  res.json({ success: true })
})

export default router
