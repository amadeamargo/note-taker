const express = require('express');
const path = require('path')
const PORT = process.env.PORT || 3001;
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { emitWarning } = require('process');
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        err ? console.error("Could not retrieve notes") : res.json(JSON.parse(data))
    })
})

app.post('/api/notes', (req, res) => {
    const title = req.body.title
    const text = req.body.text
    const newNote = {
        title,
        text,
        id: uuidv4()
    }
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        const currentNote = JSON.parse(data)
        currentNote.push(newNote)
        fs.writeFile('db/db.json', JSON.stringify(currentNote), (err) => {
            err ? console.error("Error") : console.log(`${newNote.title} successfully saved`)
        })
        res.sendFile(path.join(__dirname, 'public/notes.html'))
    })
})

// app.delete('/api/notes/:id', (req, res) => {
//     const id = req.params.id 
//  res.send(`DELETE request for note`)


// })

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
});