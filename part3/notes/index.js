const express = require('express')
const listEndpoints = require('express-list-endpoints')
const cors = require('cors')
require('dotenv').config()
const Notes = require('./models/note')
const app = express()

const requestLogger = (req, res, next) => {
  console.log('Method: ', req.method)
  console.log('Path: ', req.path)
  console.log('Body: ', req.body)
  console.log('---')
  next()
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(404).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

//request middleware
app.use(requestLogger)

//Root
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

//Get all Notes
app.get('/api/notes', (req, res) => {
  Notes.find({}).then((notes) => {
    res.json(notes)
  })
})

//Get all Notes by Id
app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  Notes.findById(id)
    .then((notes) => {
      if (notes) {
        res.json(notes)
      } else {
        res.json({ error: 'Note Not Found' })
        res.sendStatus(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

//Delete a Note by ID
app.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  Notes.deleteOne({ _id: id })
    .then(() => res.sendStatus(204).end())
    .catch((error) => next(error))
})

//Add a Note
app.post('/api/notes', (req, res, next) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ error: 'Missing Content' })
  }

  const note = new Notes({
    content: body.content,
    important: Boolean(body.important) || false,
  })
  note
    .save()
    .then((saved) => {
      res.json(saved)
    })
    .catch((error) => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  const { content, important } = req.body

  Notes.findByIdAndUpdate(
    { _id: id },
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((update) => res.json(update))
    .catch((error) => next(error))
})
const PORT = 3001

app.listen(PORT)
app.use(errorHandler)

console.log(`Server is running on port ${PORT}`)

console.table(listEndpoints(app))
