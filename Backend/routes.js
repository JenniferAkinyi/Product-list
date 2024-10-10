const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const dataFilePath = path.join(__dirname, 'data.json');

// Helper function to read data from the JSON file
const readData = () => {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
};

// READ: Get all products
router.get('/', (req, res) => {
    const products = readData();
    res.status(200).json(products);
});
// get a single product
router.get('/:id',(req, res) => {
    const products = readData()
    const product = products.find(e => e.id === parseInt(req.params.id))
    if(!product){
        return res.status(404).json({ message: 'Product not found'})
    }
    res.status(200).json(product)
})

module.exports = router;