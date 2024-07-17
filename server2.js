import http, { createServer } from 'http'
import { config } from './config.js'

const people = [
  { Id: 1, Name: 'Hamza Hussain' },
  { Id: 2, Name: 'zy' },
  { Id: 3, Name: 'Hamza' },
  { Id: 4, Name: 'Hussain' },
]
const Middlware = (req, res, next) => {
  console.log(req.method, req.url)
  next()
}

const JSONMiddlware = (req, res, next) => {
  // this middlware handles the header for the response
  res.setHeader('Content-Type', 'application/json') // SETTING HEADER
  next()
}

// handlers make the server code clean

//creating a post request
const addnewuser = (req, res) => {
  let body = '' // intializing body
  req.on('data', (chunk) => {
    // any chnage in the data will be added to body
    body += chunk
  })
  req.on('end', () => {
    // the body will added to the array once response ends
    try {
      const newuser = JSON.parse(body) // converting to string
      people.push(newuser) // adding to array

      res.statusCode = 201
      console.log(newuser)
      res.write(JSON.stringify(newuser)) // json compatiable makign
    } catch (error) {
      res.statusCode = 400
    }
  })
}
const GetAllusers = (req, res) => {
  // this is an handler for allusers
  res.statusCode = 200
  res.write(JSON.stringify(people)) // STRINGIFY GIVEN DATA
}

const GetUserByID = (req, res) => {
  // handler to get user by ID
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
}

const PageNotFound = (req, res) => {
  // handler if no page is found
  res.statusCode = 404
  res.write('PAGE NOT FOUND')
}

//FIRST API
const server2 = createServer((req, res) => {
  Middlware(req, res, () => {
    // middleware is mainly used for auth and make sure that a person will not be conducted if certain conditions are met
    JSONMiddlware(req, res, () => {
      if (req.url === '/api/users' && req.method === 'GET') {
        GetAllusers(req, res)
      } else if (req.url.startsWith(`/api/users/`) && req.method === 'GET') {
        GetUserByID(req, res)
      } else if (req.url === '/api/users' && req.method === 'POST') {
        addnewuser(req, res)
      } else {
        PageNotFound(req, res)
      }
      res.end()
    })
  })
})

// server2.listen(config.port, () => {
//   console.log(`Server running on port ${config.port}`)
// })

//FIRST API
// const server2 = createServer((req, res) => {
//   if (req.url === '/api/users' && req.method === 'GET') {
//     // CHECKING URL
//     res.setHeader('Content-Type', 'application/json') // SETTING HEADER
//     res.statusCode = 200
//     res.write(JSON.stringify(people)) // STRINGIFY GIVEN DATA
//   } else if (req.url.startsWith(`/api/users/`) && req.method === 'GET') {
//     // FINDIND USER BY ID
//     res.setHeader('Content-Type', 'application/json')
//     const id = req.url.split('/')[3]
//     const user = people.find((element) => element.Id === parseInt(id))
//     if (user) {
//       res.statusCode = 200
//       res.write(JSON.stringify(user))
//     } else {
//       // IF USER NOT FOUND
//       res.statusCode = 400
//       res.write(JSON.stringify({ message: 'user not found' }))
//     }
//   } else {
//     // Handle 404 - Page Not Found
//     res.setHeader('Content-Type', 'text/plain')
//     res.statusCode = 404
//     res.write('PAGE NOT FOUND')
//   }
//   res.end()
// })

server2.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
