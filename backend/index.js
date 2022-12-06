const lib = require('./db');
const express = require('express');

lib.connectToMongo();
const app = express();
const port = 4000;
app.use(express.json());

app.use('/api/auth', require('./Routes/auth'));
app.use('/api/notes', require('./Routes/notes'));


app.listen(port, ()=>{
    console.log(`Server Started at http://localhost:${port}`);
}) 