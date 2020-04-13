const express = require("express");

const app = express();

const artists = [
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

app.get('/', (request, response) => {
  response.send('HELLO API!');
});

app.get('/artists', (request, response) => {
  response.send(artists);
});

app.get('/artist/:id', (request, response) => {
  console.log(request.params);
  const artist = artists.find( (artist) => artist.id === request.params.id);
  response.send(artist);
});

app.listen(3737, () => {
  console.log('API app started!')
});