const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Para poder manejar JSON en las requests


mongoose.connect('mongodb://localhost:27017/nombre_de_tu_base_de_datos', {//bdpropia
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));