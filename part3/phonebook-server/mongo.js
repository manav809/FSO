const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const username = process.argv[2]

const password = process.argv[3]

const url = `mongodb+srv://${username}:${password}@cluster0.cse4eeb.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const phoneNumber = mongoose.model('phoneNumber', phoneSchema)

const phone = new phoneNumber({
  name: 'Tony',
  number: '180028342892',
  id: 4,
})

phone.save().then(() => {
  console.log(`added ${phone.name}'s number: ${phone.number} to phonebook`)
})

phoneNumber.find({}).then((result) => {
  console.log('phonebook: ')
  result.forEach((phone) => {
    console.log(`${phone.name} ${phone.number}`)
  })
  mongoose.connection.close()
})
