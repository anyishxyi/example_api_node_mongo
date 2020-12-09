"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _thing = _interopRequireDefault(require("./routes/thing"));

var _user = _interopRequireDefault(require("./routes/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

_mongoose["default"].connect('mongodb+srv://admin:5ywvuz3M4YTuNrQt@cluster0.jf5ky.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(function () {
  console.log('\nSuccessully connected to MongoDB Atlas !\n');
})["catch"](function (error) {
  return console.error('\nUnable to connect to MongoDB Atlas\n', error);
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
app.use('/api/stuff', _thing["default"]);
app.use('/api/auth', _user["default"]);
var _default = app;
exports["default"] = _default;