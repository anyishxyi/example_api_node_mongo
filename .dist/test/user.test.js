"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const userData = {
  "email": "test@test.me",
  "password": "testtesttest"
};
describe('User Model Test', () => {
  beforeAll(async () => {
    await _mongoose.default.connect(process.env.__MONGO_URI__, {
      useNewUrlParser: true,
      useCreateIndex: true
    }, err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });
  it('create & save user successfully', async () => {
    const validUser = new UserModel(userData);
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.gender).toBe(userData.gender);
    expect(savedUser.dob).toBe(userData.dob);
    expect(savedUser.loginUsing).toBe(userData.loginUsing);
  });
});