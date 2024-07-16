import http from 'http'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from './config.js'

// Convert import.meta.url to __filename
const __filename = fileURLToPath(import.meta.url) // this gets me the complete path till the filename

// Get the directory name from __filename
const __dirname = path.dirname(__filename) // this gets me the path till the directory name

// Create an HTTP server
const server = http.createServer(async (req, res) => {
  try {
    // Set the response header to 'text/html'
    res.setHeader('Content-Type', 'text/html')
    let filepath = '' // setting a filepath variable
    // Check if the request method is GET
    if (req.method === 'GET') {
      // checking if told method is used
      // checking if the

      // Determine the file path based on the request URL
      if (req.url === '/') {
        filepath = path.join(__dirname, 'public', 'index.html')
      } else if (req.url === '/about') {
        filepath = path.join(__dirname, 'public', 'about.html')
      } else {
        // Log the error and throw an error if the path is not found
        // console.error(`PATH NOT FOUND: ${req.url}`)
        // throw new Error('PATH NOT FOUND')
      }

      //   // Debug log the file path
      //   console.log(`Serving file: ${filepath}`)

      //   // Read the file asynchronously
      const data = await fs.readFile(filepath) // reading the filepath

      // Write the file data to the response
      res.write(data) // sending the path data to the webpage

      // End the response
      res.end()
    } else {
      // Log the error and throw an error if the method is not allowed
      console.error(`METHOD NOT ALLOWED: ${req.method}`)
      throw new Error('METHOD NOT ALLOWED')
    }
  } catch (error) {
    // Log any errors that occur
    // console.error(error)
    res.statusCode = 500
    res.end('Internal Server Error')
  }
})

// Listen on the specified port
server.listen(8000, () => {
  console.log(`Server running on port ${config.port}`)
})

// basic server

// const server = http.createServer((req, res) => {
//   res.setHeader('Content-type', 'text/html') // set what type of content can be seen on the webpage
//   // we can have various types like text/plain, application/json etc.

//   console.log(req.method) // what method POST,GET,PUT,DELETE WE USE
//   console.log(req.url) // WHAT PAGE OF THE WEBSITE WE ARE ON

//   res.statusCode = 404
//   res.write('<h1>hello world</h1> ') // what content can be seen on the web page

//   //   res.writeHead(404, { 'Content-type': 'text/html' }) status and header in one cmd
//   res.end() // ending the response
// })
