"use strict";

var express = require('express');

var router = express.Router();

var auth = require('../middleware/auth');

var stuffCtrl = require('../controllers/stuff');

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router["delete"]('/:id', auth, stuffCtrl.deleteThing);
module.exports = router;