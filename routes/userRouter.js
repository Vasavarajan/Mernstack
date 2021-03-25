const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');


router.post('/register', userCtrl.register)


module.exports = router;