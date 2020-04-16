const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// data
let artists = [
  {
    id: 'id_1',
    name: 'Metalica'
  },
  {
    id: 'id_2',
    name: 'Max korj'
  },
  {
    id: 'id_3',
    name: 'Beatles'
  }
];

// routes
app.get('/', (request, response) => {
  response.send('HELLO API!')
});

app.get('/artists', (request, response) => {
  response.send(artists)
});

app.get('/artist/:id', (request, response) => {
  console.log(request.params);
  const artist = artists.find( (artist) => artist.id === request.params.id);
  response.send(artist)
});

app.post('/artists', (request, response) => {
  const artist = {
    id: Date.now(),
    name: request.body.name
  };

  artists.push(artist);
  response.send("post data")
});

app.put('/artist/:id', (request, response) => {
  const artist = artists.find( (artist) => artist.id === request.params.id);
  artist.name = request.body.name
  response.sendStatus(200)
})

app.delete('/artist/:id', (request, response) => {
  artists = artists.filter( ( artist ) => artist.id !== request.params.id )
  response.sendStatus(200)
})

// start server
app.listen(3737, () => {
  console.log('API app started!')
});