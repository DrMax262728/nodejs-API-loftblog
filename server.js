const express = require("express");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
let db;

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
  db.collection('artists').find().toArray( (err, docs) => {
    if (err) {
      console.log(err);
      response.sendStatus(500)
    }

    response.send(docs)
  })
});

app.get('/artist/:id', (request, response) => {
  console.log(request.params);
  const artist = artists.find( (artist) => artist.id === request.params.id);
  response.send(artist)
});

app.post('/artists', async (request, response) => {
  const artist = {
    name: request.body.name
  };

  await db.collection('artists').insertOne(artist, (err, result) => {
    if (err) {
      console.log(err);
      return response.sendStatus(500);
    }

    response.send(artist)
  })
});

app.put('/artist/:id', (request, response) => {
  const artist = artists.find( (artist) => artist.id === request.params.id);
  artist.name = request.body.name
  response.sendStatus(200)
})

app.delete('/artist/:id', (request, response) => {
  artists = artists.filter( ( artist ) => artist.id !== request.params.id )
  response.sendStatus(200)
});

MongoClient.connect('mongodb://localhost',(err, client) => {
  if (err) {
    return console.log(err)
  }

  db = client.db('maxapi');

// start server
app.listen(3737, () => {
  console.log('API app started!')
});

});