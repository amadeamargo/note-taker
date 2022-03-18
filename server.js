const express = require('express');
const path = require('path')
const PORT = process.env.PORT || 3001;
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
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

app.get('api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        err ? console.error("Could not retrive notes") : res.json(JSON.parse(data))
    })
})




app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
});