//MONGO DB CONNECTION: mongodb+srv://isaac:<password>@cluster0-zob1a.mongodb.net/test?retryWrites=true&w=majority
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();

//now we need to register our new router in our app.js file
//First we need to import it i.e. registering our routes with the app
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

//we need to import our data model incase we want to use it in our app

mongoose.connect('mongodb+srv://isaac:YZv5xlNvqwuJMa2Z@cluster0-zob1a.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => {
        console.log('Succesfuly connected to mongodb atlas')
    }).catch((error) => {
        console.log('Unable to connect succesfully to mongodb atlas');
        console.error(error);
    })

//body-parser allows us to be able to extract the JSON object from the request

//to work with mongoose

//express app are simply a series of middleware
//contains four pieces of middleware

//logs "request received" to the console and hands on execution.
// app.use((req, res, next) => {
//     console.log('Request received!');
//     next(); //allows middleware to pass execution to the next piece of middleware
// })

// app.use((req, res, next) => {
//     res.status(201);
//     next();
// })

// app.use((req, res) => {
//     res.json({ message: 'Your request was succesful'});
//     next();
// })

// app.use((req, res, next) => {
//     console.log('Response was snt succesfully');
// })

//the extra arguement we are passing corresponds to the endpoint for which we want this piece of middleware to be registered
//i.e. http://localhost:3000/api/stuff - is the URL being requested by the front end
//we are creating an array of stuff
//we then send that stuff as a JSON data, along with a status of 200 for succesful request.


//this allows requests from all origins to access your API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json()); //convert body into a usable JSON object


  //Registering our router for for all requests to /api/stuff
  app.use('/api/stuff', stuffRoutes);
  app.use('/api/auth', userRoutes);
  
  


  /****************CORS ERRORS*********** 
   * CORS - Cross Origin Sharing.
   * Is a standard that allows us to relax default security rules which prevent HTTP calls from being made between different servers
   * I.e localhost:3000 not able to communicate with localhost:4200
   * To enable them communicate, we need to add some headers to our response object
  */

module.exports = app;