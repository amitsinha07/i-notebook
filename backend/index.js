const lib = require('./db');
const express = require('express');

lib.connectToMongo();
const app = express();
const port = 4000;

app.get('/', (req, res) =>{
    res.send("Hello World!");
})

app.listen(port, ()=>{
    console.log(`Server Started at http://localhost:${port}`);
})