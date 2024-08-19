require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const notesRoutes = require('./routes/notes'); 

const app = express();

//Middleware to parse request body 
app.use(express.json());

app.use('/api/notes', notesRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('DB connected & Server started on http://localhost:'+process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
