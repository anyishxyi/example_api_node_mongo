"use strict";

var Thing = require('../models/thing');

exports.createThing = function (req, res, next) {
  var thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  thing.save().then(function () {
    res.status(201).json({
      message: 'Post saved successfully!'
    });
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
};

exports.getOneThing = function (req, res, next) {
  Thing.findOne({
    _id: req.params.id
  }).then(function (thing) {
    res.status(200).json(thing);
  })["catch"](function (error) {
    res.status(404).json({
      error: error
    });
  });
};

exports.modifyThing = function (req, res, next) {
  var thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  Thing.updateOne({
    _id: req.params.id
  }, thing).then(function () {
    res.status(201).json({
      message: 'Thing updated successfully!'
    });
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
};

exports.deleteThing = function (req, res, next) {
  Thing.deleteOne({
    _id: req.params.id
  }).then(function () {
    res.status(200).json({
      message: 'Deleted!'
    });
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
};

exports.getAllStuff = function (req, res, next) {
  Thing.find().then(function (things) {
    res.status(200).json(things);
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
};