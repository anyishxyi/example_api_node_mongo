"use strict";

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.signup = async (req, res, next) => {
  const pass = req.body.password ? req.body.password : '';
  if (!pass) res.status(500).json({
    error: 'error while hashing password'
  });
  const salt = await _bcrypt.default.genSaltSync(10);
  const hash = await _bcrypt.default.hashSync(pass, salt);

  if (!hash) {
    console.error('error while encrypting password');
    res.status(500).json({
      error: 'error while hashing password'
    });
  }

  const user = new _user.default({
    email: req.body.email,
    password: hash
  });
  const savedUser = await user.save();
  console.log('savedUser', savedUser);
  if (!savedUser) res.status(500).json({
    error: error
  });
  res.status(201).json({
    userSaved: savedUser
  });
};

exports.login = (req, res, next) => {
  _user.default.findOne({
    email: req.body.email
  }).then(user => {
    if (!user) {
      return res.status(401).json({
        error: new Error('User not found!')
      });
    }

    _bcrypt.default.compare(req.body.password, user.password).then(valid => {
      if (!valid) {
        return res.status(401).json({
          error: new Error('Incorrect password!')
        });
      }

      const token = _jsonwebtoken.default.sign({
        userId: user._id
      }, 'RANDOM_TOKEN_SECRET', {
        expiresIn: '24h'
      });

      res.status(200).json({
        userId: user._id,
        token: token
      });
    }).catch(error => {
      res.status(500).json({
        error: error
      });
    });
  }).catch(error => {
    res.status(500).json({
      error: error
    });
  });
};