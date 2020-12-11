import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

exports.signup = async (req, res, next) => {
  const pass = req.body.password ? req.body.password : '';
  if(!pass) res.status(500).json({ error: 'error while hashing password' });

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(pass, salt);

  if(!hash) {
    console.error('error while encrypting password');
    res.status(500).json({ error: 'error while hashing password' });   
  }

  const user = new User({ email: req.body.email, password: hash });
  const savedUser = await user.save();

  if(!savedUser) res.status(500).json({ error: error });

  res.status(201).json({ userSaved: savedUser });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('User not found!')
        });
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!')
            });
          }
          const token = jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' });
          res.status(200).json({
            userId: user._id,
            token: token
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
      });
    }
  );
}