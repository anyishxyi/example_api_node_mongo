const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://admin:5ywvuz3M4YTuNrQt@cluster0.jf5ky.mongodb.net/<dbname>?retryWrites=true&w=majority', { useUnifiedTopology: true })
				.then(() => { console.log('\nSuccessully onnected to MongoDB Atlas !\n')})
				.catch((error) => console.error('\nUnable to connect to MongoDB Atlas\n', error));

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