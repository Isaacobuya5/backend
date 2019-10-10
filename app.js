const express = require('express');

const app = express();
//body-parser allows us to be able to extract the JSON object from the request
const bodyParser = require('body-parser')
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

  app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Thing created successfully!'
    });
  });

app.use('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'My first thing',
        description: 'All of the info about my first thing',
        imageUrl: 'https://picsum.photos/id/237/200/300',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'My second thing',
        description: 'All of the info about my second thing',
        imageUrl: '',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
  });


  /****************CORS ERRORS*********** 
   * CORS - Cross Origin Sharing.
   * Is a standard that allows us to relax default security rules which prevent HTTP calls from being made between different servers
   * I.e localhost:3000 not able to communicate with localhost:4200
   * To enable them communicate, we need to add some headers to our response object
  */

module.exports = app;