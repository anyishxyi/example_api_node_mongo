"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _stuff = _interopRequireDefault(require("../controllers/stuff"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', _auth["default"], _stuff["default"].getAllStuff);
router.post('/', _auth["default"], _stuff["default"].createThing);
router.get('/:id', _auth["default"], _stuff["default"].getOneThing);
router.put('/:id', _auth["default"], _stuff["default"].modifyThing);
router["delete"]('/:id', _auth["default"], _stuff["default"].deleteThing);
var _default = router;
exports["default"] = _default;