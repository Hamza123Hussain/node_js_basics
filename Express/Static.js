import mongoose from 'mongoose'
import { config } from '../config.js'

mongoose
  .connect(
    'mongodb+srv://hamzahussain:Hamza123@cluster0.ad3k6f1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  ) // Options to avoid deprecation warnings
  .then(() => {
    console.log('db connected')
  })
  .catch((error) => {
    console.error('DataBase Error:', error)
  })

// Rest of your Express server setup
import Router from './Routes/Params_Query.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use('/api/posts', Router)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(8000, () => {
  console.log('PORT RUNNING')
})
