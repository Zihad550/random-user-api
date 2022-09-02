// third-party modules
const express = require('express');
const cors = require('cors');

// routes
const userRoutes = require('./routes/v1/user.route');


const app = express();
const PORT = process.env.PORT || 9000;

// global middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/user', userRoutes)

app.get('/', (req, res) => {
    res.send('Welcome to Random user api');
});

app.listen(PORT, () => {
    console.log('App running at port', PORT)
})