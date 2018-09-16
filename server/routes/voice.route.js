var express = require('express');
var router = express.Router();

// Require the controllers
const voice_controller = require('../../controllers/voice.controller');

// test url to check files are communicated properly
router.get('/test', voice_controller.test);

// create new employee
router.get('/voice_submit', voice_controller.voice_submit);

module.exports = router;
