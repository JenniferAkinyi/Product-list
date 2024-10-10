const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS options to allow requests from frontend running on port 5500
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'], 
    methods: 'GET, POST, PUT, DELETE, OPTIONS', 
    allowedHeaders: ['Content-Type', 'Authorization'] 
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

const productRoutes = require('./routes');
app.use('/api/products', productRoutes); 

app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API!');
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
