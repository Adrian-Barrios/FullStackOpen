const express = require('express'); 
const app = express();
const morgan = require('morgan'); // Importing morgan for logging
const cors = require('cors'); // Importing cors for handling cross-origin requests

app.use(express.json()); // Middleware to parse JSON bodies
app.use(morgan('tiny')); // Using morgan to log requests in 'tiny' format
app.use(cors()); // Enabling CORS for all routes

var people = [
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

app.get('/', (req, res) => {
  res.send('<h1>Phonebook Backend: Add /api/persons to see the list in the phonebook</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(people)
})

app.get('/info', (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${people.length} people </p>
    ${date}`);
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = people.find(p => p.id === id);
  if (!person){
    return res.status(404).json({ error: 'Person not found' });
  } else {
    res.json(person);
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const personIndex = people.findIndex(p => p.id === id);
  
  if (personIndex === -1) {
    return res.status(404).json({ error: 'Person not found' });
  }
  
  people.splice(personIndex, 1);
  res.status(204).end();
})

const generateId = () => {
  const MaxId = people.length > 0 ? Math.max(...people.map(p => Number(p.id))) : 0;
  return String(MaxId + 1);
}

app.post('/api/persons/', (req, res) => {
  const id = generateId();
  const content = req.body;
  if (!content.name || !content.number) {
    console.log('Name or number missing');
    return res.status(400).json({ error: 'Name or number missing' });
  } else if (people.some(p => p.name === content.name)) {
    console.log('Name must be unique');
    return res.status(400).json({ error: 'Name must be unique' });
  }
  const person = {
    id: id,
    name: content.name,
    number: content.number
  };
  res.status(201).json(person);
  people = people.concat(person);
})

PORT= process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})