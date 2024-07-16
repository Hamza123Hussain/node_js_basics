import http, { createServer } from 'http'
import { config } from './config.js'

const people = [
  { Id: 1, Name: 'Hamza Hussain' },
  { Id: 2, Name: 'zy' },
  { Id: 3, Name: 'Hamza' },
  { Id: 4, Name: 'Hussain' },
]
//FIRST API

const server2 = createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    // CHECKING URL
    res.setHeader('Content-Type', 'application/json') // SETTING HEADER
    res.statusCode = 200
    res.write(JSON.stringify(people)) // STRINGIFY GIVEN DATA
  } else if (req.url.startsWith(`/api/users/`) && req.method === 'GET') {
    // FINDIND USER BY ID
    res.setHeader('Content-Type', 'application/json')
    const id = req.url.split('/')[3]
    const user = people.find((element) => element.Id === parseInt(id))
    if (user) {
      res.statusCode = 200
      res.write(JSON.stringify(user))
    } else {
      // IF USER NOT FOUND
      res.statusCode = 400
      res.write(JSON.stringify({ message: 'user not found' }))
    }
  } else {
    // Handle 404 - Page Not Found
    res.setHeader('Content-Type', 'text/plain')
    res.statusCode = 404
    res.write('PAGE NOT FOUND')
  }
  res.end()
})

server2.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
