// MONGODB PASSWORD : 5ywvuz3M4YTuNrQt
// MONGODB CONNECTION : mongodb+srv://admin:<password>@cluster0.jf5ky.mongodb.net/<dbname>?retryWrites=true&w=majority
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://admin:5ywvuz3M4YTuNrQt@cluster0.jf5ky.mongodb.net/<dbname>?retryWrites=true&w=majority')
				.then(() => { console.log('Successully onnectedto MongoDB Atlas !')})
				.catch((error) => console.error(error));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/stuff', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Thing created successfully!'
  });
});

app.get('/api/stuff/1', (req, res, next) => {
  console.log(req.params);
  res.status(200).json({
    message: 'Thing created successfully!'
  });
});

module.exports = app;