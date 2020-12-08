"use strict";

var _thing = _interopRequireDefault(require("../models/thing"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.createThing = function (req, res, next) {
  console.log('hey');
  var thing = new _thing["default"]({
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
    console.log('error', error);
    res.status(400).json({
      error: error
    });
  });
};

exports.getOneThing = function (req, res, next) {
  _thing["default"].findOne({
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
  var thing = new _thing["default"]({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });

  _thing["default"].updateOne({
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
  _thing["default"].deleteOne({
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
  _thing["default"].find().then(function (things) {
    res.status(200).json(things);
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
};