import cors from 'cors'
import express, { Application } from 'express'
import todoRoutes from './routes/todo.routes'

const app: Application = express()
const port: number = 5000

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/todos', todoRoutes)

app.listen(port, (): void => {
  console.log('Server started')
})