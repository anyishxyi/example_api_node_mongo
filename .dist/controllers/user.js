"use strict";

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.signup = function (req, res, next) {
  _bcrypt["default"].genSalt(10, function (err, salt) {
    _bcrypt["default"].hash(req.body.password, salt).then(function (hash) {
      var user = new _user["default"]({
        email: req.body.email,
        password: hash
      });
      user.save().then(function () {
        res.status(201).json({
          message: 'User added successfully!'
        });
      })["catch"](function (error) {
        res.status(500).json({
          error: error
        });
      });
    })["catch"](function (error) {
      console.error('error while encrypting password');
      res.status(500).json({
        error: error
      });
    });
  });
};

exports.login = function (req, res, next) {
  _user["default"].findOne({
    email: req.body.email
  }).then(function (user) {
    if (!user) {
      return res.status(401).json({
        error: new Error('User not found!')
      });
    }

    _bcrypt["default"].compare(req.body.password, user.password).then(function (valid) {
      if (!valid) {
        return res.status(401).json({
          error: new Error('Incorrect password!')
        });
      }

      var token = _jsonwebtoken["default"].sign({
        userId: user._id
      }, 'RANDOM_TOKEN_SECRET', {
        expiresIn: '24h'
      });

      res.status(200).json({
        userId: user._id,
        token: token
      });
    })["catch"](function (error) {
      res.status(500).json({
        error: error
      });
    });
  })["catch"](function (error) {
    res.status(500).json({
      error: error
    });
  });
};