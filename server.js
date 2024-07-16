import http from 'http'

const server = http.createServer((req, res) => {
  res.setHeader('Content-type', 'text/html') // set what type of content can be seen on the webpage
  // we can have various types like text/plain, application/json etc.

  res.statusCode = 404
  res.write('<h1>hello world</h1> ') // what content can be seen on the web page

  //   res.writeHead(404, { 'Content-type': 'text/html' }) status and header in one cmd
  res.end() // ending the response
})

const Port = 8000

server.listen(Port, () => {
  console.log(`PORT RUNNING ON ${Port}`)
})
