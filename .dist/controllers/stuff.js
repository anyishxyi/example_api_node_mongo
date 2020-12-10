"use strict";

var _thing = _interopRequireDefault(require("../models/thing"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createThing = (req, res, next) => {
  console.log('hey');
  const thing = new _thing.default({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  thing.save().then(() => {
    res.status(201).json({
      message: 'Post saved successfully!'
    });
  }).catch(error => {
    console.log('error', error);
    res.status(400).json({
      error: error
    });
  });
};

exports.getOneThing = (req, res, next) => {
  _thing.default.findOne({
    _id: req.params.id
  }).then(thing => {
    res.status(200).json(thing);
  }).catch(error => {
    res.status(404).json({
      error: error
    });
  });
};

exports.modifyThing = (req, res, next) => {
  const thing = new _thing.default({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });

  _thing.default.updateOne({
    _id: req.params.id
  }, thing).then(() => {
    res.status(201).json({
      message: 'Thing updated successfully!'
    });
  }).catch(error => {
    res.status(400).json({
      error: error
    });
  });
};

exports.deleteThing = (req, res, next) => {
  _thing.default.deleteOne({
    _id: req.params.id
  }).then(() => {
    res.status(200).json({
      message: 'Deleted!'
    });
  }).catch(error => {
    res.status(400).json({
      error: error
    });
  });
};

exports.getAllStuff = (req, res, next) => {
  _thing.default.find().then(things => {
    res.status(200).json(things);
  }).catch(error => {
    res.status(400).json({
      error: error
    });
  });
};