const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const port = process.env.PORT || 5005;
const clientPath = path.join(__dirname, 'client');

const postRouter = require('./routes/post');
const keys = require('./keys');

const app = express();
app.use('/api/post', postRouter);
app.use(express.static(clientPath));

mongoose.connect(keys.mongoDbLocal)
    .then(() => {
        console.log('MongoDB Connected!');
    })
    .catch(error => {
        console.error(error);
    });


// запуск сервера
app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});
