const express = require('express');
const app = express();

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        imporant: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.use(express.json());

const generateID = () => {
    const maxID = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxID + 1;
}

app.post('/api/notes', (request, response) => {
    const body = request.body;

    if (!body) {
        return response.status(400).json({
            error: 'content missing'
        });
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateID(),
    }

    notes = notes.concat(note);

    response.json(note);
})

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
})

app.get('/api/notes', (request, response) => {
    response.json(notes);
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(_note => _note.id === id);

    if (note) {
        response.json(note);
    }
    else {
        response.status(404).end();
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.filter(_note => _note.id !== id);

    response.status(204).end();
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});