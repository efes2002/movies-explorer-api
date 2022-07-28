require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 4000 } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
