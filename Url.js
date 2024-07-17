import url from 'url'

const URLpath = 'https://www.google.com/search?q=hania'

const urlobject = new URL(URLpath) // creating a new url object

// console.log(urlobject) // WE GET ALL THE DETAILS OF THE URL

console.log(url.format(urlobject))

const search = urlobject.search // we getting the serach details
console.log(search)

const params = new URLSearchParams(search) // getting all the search params
console.log(params.get('q')) // getting value of a specific search param
params.set('limit', 5) // adding a new param
params.delete('limit') // deleting a param
console.log(params)
