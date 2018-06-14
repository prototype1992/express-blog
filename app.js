const express = require('express');
const path = require('path');

const port = process.env.PORT || 5000;
const clientPath = path.join(__dirname, 'client');

const app = express();

// делаем папку client статичной
app.use(express.static(clientPath));


// запуск сервера
app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});
