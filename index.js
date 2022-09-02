const express = require('express');

const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
    res.send('Welcome to Random user api');
});

app.listen(PORT, () => {
    console.log('App running at port', PORT)
})