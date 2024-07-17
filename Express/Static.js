import Router from './Routes/Params_Query.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

// // Get the directory name from __filename
// const __filename = fileURLToPath(import.meta.url) // this gets me the complete path till the filename

// const __dirname = path.dirname(__filename) // this gets me the path till the directory name

const app = express()

app.use(express.json()) // this is used as a body parser in express for json
app.use('/api/posts', Router) //Router for particular path has been setup

// app.use(express.static(path.join(__dirname, 'public'))) // THIS IS A STATIC SERVER
// // WE SSET A ROUTE HERE AND THEN CAN CALL ANY HTML FILE OR OTHER IN THE GIVEN PATH
// // BUT WE NEED TO GIVE THE WHOLE NAME LIKE INDEX.HTML ELSE IT WON'T WORK

app.get('/', (req, res) => {
  // this is the get method
  res.send('<h1>HELLO WORLDDD</h1>') // in express we do not need to specify what kind of content we are sending
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(8000, () => {
  // turning on the port nummber
  console.log('PORT RUNNIGN')
})
