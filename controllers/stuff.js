const Thing = require('../models/thing');

//controller for adding an item into database
exports.createThing = (req, res, next) => {
    const thing = new Thing({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    });
    //saving to database - returns a new promise
    thing.save().then(() => {
        res.status(201).json({
          message: 'Post saved succesfully'
        });
    }).catch((error) => {
      res.status(400).json({
        error: error
      });
    });

};

//controller for getting a single item
exports.getOneThing = (req, res, next) => {
    console.log(req.params);
    Thing.findOne({ _id: req.params.id})
    .then((thing) => {
  res.status(200).json(thing);
  })
    .catch((error) => {
      res.status(404).json(error);
  });
  };

  //controller for modifying a thing
  exports.modifyThing = (req, res, next) =>{
    const thing = new Thing({
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.price
    });
    Thing.updateOne({
      _id: req.params.id
    }, thing).then(() => {
        res.status(201).json({
          message: 'Thing updated succesfully!'
        });
    }).catch((error) => {
      res.status(400).json({
        error: error
      });
    })
};

//controller for deleting a thing
exports.deleteThing = (req,res,next) => {
    Thing.deleteOne({_id: req.params.id}).then(
        () => {
          res.status(200).json({
            message: 'Deleted'
          });
        }
    ).catch((error) => {
      res.status(400).json({
        error: error
      })
    })
};

//controller for getting all stuff
exports.getAllStuff = (req, res, next) => {
    //we use find method on our model to return an array containing all things in our database
      Thing.find().then((things) => {
        res.status(200).json(things);
      }).catch((error) => {
        res.status(400).json({
          error: error
        });
      });
    };




