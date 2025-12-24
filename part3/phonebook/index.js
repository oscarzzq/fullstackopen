const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const currentTime = new Date()
    response.send(`<p>Phonebook Has info for ${persons.length} people</p> \n ${currentTime}`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const id = Math.floor(Math.random() * 1000)

    if (!body) {
        return response.status(400).json({
            error: 'content missing',
        })
    } else if (!body.number && !body.name) {
        return response.status(400).json({
            error: 'number and name missing',
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing',
        })
    } else if (!body.name) {
        return response.status(400).json({
            error: 'name missing',
        })
    } else if (persons.map(person => person.name).includes(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: String(id),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    return response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {

    const id = request.params.id
    persons = persons.filter(person => person.id !== String(id))
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})