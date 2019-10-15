const express = require('express');
const router = express.Router();

//apply authentication to our routes
const auth = require('../middleware/auth');

//importing our controllers
const stuffCtrl = require('../controllers/stuff');
//register our routes to Express router
router.post('/', auth, stuffCtrl.createThing);

router.get('/', auth, stuffCtrl.getAllStuff);

router.get('/:id',auth, stuffCtrl.getOneThing);

//updating an individual record into our schema
//using a new keyword with Mongoose creates a new _id field by default
router.put('/:id',auth, stuffCtrl.modifyThing);

//deleting a record from database
router.delete('/:id',auth, stuffCtrl.deleteThing);


module.exports = router;