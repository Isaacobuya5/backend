const express = require('express');
const router = express.Router();
const Thing = require('../models/thing')

//importing our controllers
const stuffCtrl = require('../controllers/stuff');
//register our routes to Express router
router.post('/', stuffCtrl.createThing);

router.get('/', stuffCtrl.getAllStuff);

router.get('/:id', stuffCtrl.getOneThing);

//updating an individual record into our schema
//using a new keyword with Mongoose creates a new _id field by default
router.put('/:id', stuffCtrl.modifyThing);

//deleting a record from database
router.delete('/:id', stuffCtrl.deleteThing);


module.exports = router;