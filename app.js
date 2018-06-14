const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const keys = require('./keys');

const port = process.env.PORT || 5000;
const clientPath = path.join(__dirname, 'client');

const app = express();

mongoose.connect(keys.mongoURI)
    .then(response => {
        console.log('MongoDB Connected!', response);
    })
    .catch(error => {
        console.log('MongoDB Error!', error);
    });

// делаем папку client статичной
app.use(express.static(clientPath));


// запуск сервера
app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});
