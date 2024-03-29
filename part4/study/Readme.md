```js
Note.find({}).then(notes => {
    console.log('operation returned the following notes', notes)
}).then()
//or

const notes = await Note.find({})
console.log('operation returned the following notes', notes)


Note.find({}).then(notes => {
    return notes[0].deleteOne()
}).then(response => {
    console.log('the first note is removed')
})

//or 
//await can be used iff async is there
const main = async() => {
    const notes = await Note.find({})
    const response = await notes[0].deleteOne()
    console.log('the first note is removed.') 
}
main()

```

