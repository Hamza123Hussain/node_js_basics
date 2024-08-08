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
/**app.use(express.static(path.join(__dirname, 'public'))) in a Node.js Express application tells the server to serve static files (like HTML, CSS, JavaScript, and images) from the public directory.
 * This means that when users access the website, they can directly request these files through URLs.
 *  For example, if there's an image logo.png in the public directory, it can be accessed at http://yourdomain.com/logo.png.
 *  This line ensures that all files in the public directory are available to the users visiting your site. */

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
  //finding product in DB
  try {
    const products = await ProductModel.find() //finding products
    res.status(201).json(products) // products found and printed
  } catch (error) {
    console.error('Error creating product:', error) // products not found
    res.status(500).send('ERROR')
  }
})

app.get('/api/Product/:id', async (req, res) => {
  // getting product by id
  try {
    const { id } = req.params // extracting id
    const product = await ProductModel.findById(id) //locating product
    res.status(201).json(product) // product found
  } catch (error) {
    console.error('Error creating product:', error) // product not found
    res.status(500).send('ERROR')
  }
})

app.put('/api/Product/:id', async (req, res) => {
  // Updating Product
  try {
    const product = req.body // giving data from body
    const { id } = req.params // extracting id
    const updatedproduct = await ProductModel.findByIdAndUpdate(id, product) //locating product
    res.status(201).json(updatedproduct) // product found and Updated
  } catch (error) {
    console.error('Error creating product:', error) // product not found
    res.status(500).send('ERROR')
  }
})

app.delete('/api/Product/:id', async (req, res) => {
  //Deleting Product
  try {
    const { id } = req.params // extracting id
    const deletedproduct = await ProductModel.findByIdAndDelete(id) //locating product
    res.status(201).json({ message: 'PRODUCT DELETED' }) // product Deleted
  } catch (error) {
    console.error('Error creating product:', error) // product not found
    res.status(500).send('ERROR')
  }
})
//---
//----------------------------------------------------------------------------------------------------
app.listen(8000, () => {
  console.log('PORT RUNNING')
})
