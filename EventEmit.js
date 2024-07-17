import { EventEmitter } from 'events'
const Emiiter = new EventEmitter() // creating event emitter object

const Hello = (name) => {
  console.log('hello world', name)
}

const Bye = () => {
  console.log('bye world')
}

Emiiter.on('hi', Hello) // sensing event
Emiiter.on('hey', Bye)

Emiiter.emit('hi', 'hamza') // emitting event
Emiiter.emit('hey')
