import fs from 'fs'
import { promises as file } from 'fs'

// these run will fs from the fs package
// fs.readFile('./text.txt', 'utf-8', (error, data) => {
//   if (error) {
//     console.error(error)
//     return
//   }
//   console.log(data)
// })

//reading file synchronously
// const data = fs.readFileSync('./text.txt', 'utf-8')
// console.log(data)

// ---------------------------------------------------------------------------

// these with fs from the the fs/promise package

// file
//   .readFile('./text.txt', 'utf8')
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error))

//The Async/Await with fs/promises method is the best approach for reading files.
// It provides a clean and readable syntax, is non-blocking, and is modern.
// It effectively handles errors with try/catch blocks and makes the asynchronous code look synchronous
const Readme = async () => {
  try {
    const data = await file.readFile('./text.txt', 'utf-8')
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

const Writeme = async () => {
  // this would add new data to the file and erase the old
  try {
    const data = await file.writeFile('./text.txt', 'FULL STACK')
    // console.log(data)
  } catch (error) {
    console.log(error)
  }
}

const Appendme = async () => {
  // this adds new data and keeps the old one too
  try {
    const data = await file.appendFile('./text.txt', ' Developer')
    // console.log(data)
    Readme()
  } catch (error) {
    console.log(error)
  }
}
Writeme()
Appendme()
// Readme()
