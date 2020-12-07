const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const thingRouter = require('./router/thing');

const app = express();

mongoose.connect('mongodb+srv://admin:5ywvuz3M4YTuNrQt@cluster0.jf5ky.mongodb.net/<dbname>?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
				.then(() => { console.log('\nSuccessully connected to MongoDB Atlas !\n')})
				.catch((error) => console.error('\nUnable to connect to MongoDB Atlas\n', error));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/stuff', thingRouter);

module.exports = app;