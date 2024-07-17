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
import ProductModel from '../Model/Product.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use('/api/posts', Router)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//MONGODB CRUD BELOW
//--------------------------------------------------------------------------------------------------
app.post('/api/CreateProduct', async (req, res) => {
  // adding data in db
  try {
    const product = req.body // giving data from body
    const createdProduct = await ProductModel.create(product) //adding data to db
    res.status(201).json(createdProduct) // printing created data
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).send('ERROR')
  }
})

app.get('/api/Product', async (req, res) => {
  // adding data in db
  try {
    const products = await ProductModel.find() //adding data to db
    res.status(201).json(products) // printing created data
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).send('ERROR')
  }
})
//----------------------------------------------------------------------------------------------------
app.listen(8000, () => {
  console.log('PORT RUNNING')
})
