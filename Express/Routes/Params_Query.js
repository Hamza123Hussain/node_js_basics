import express from 'express'

const posts = [
  { id: 1, Name: 'HAMZA HUSSAIN' },
  {
    id: 2,
    Name: 'hamza',
  },
  {
    id: 3,
    Name: 'hussain',
  },
  { id: 4, Name: 'King Kholi' },
  {
    id: 5,
    Name: 'pumzi',
  },
  {
    id: 6,
    Name: 'hamzi',
  },
]

const Router = express.Router() //creating a router

Router.get('/', (req, res) => {
  // the path is given to app.use
  console.log(req.query.limit) //http://localhost:8000/api/posts?limit=5 req.query refers to the query made after the question mark
  const limit = req.query.limit
  if (!isNaN(limit) && limit > 0) {
    //  check for limit is a number.. this check is made to prevent from sql injecttions
    return res.status(202).json(posts.slice(0, limit))
  }
  res.status(202).json(posts) // we can use res.send but this is specifically made for json
})

Router.get('/:id', (req, res) => {
  // : IS USED FOR SENDING PARAM IN URL
  console.log(req.params.id) //http://localhost:8000/api/posts?limit=5 req.query refers to the query made after the question mark
  const id = req.params.id

  const post = posts.find((element) => element.id == id) // Check if post exist
  if (post) {
    return res.json(post)
  }
  res.status(404).json({ Message: `NO POST FOUND WITH ${id}` }) // setting status code through .status
})

export default Router // exporting the router
