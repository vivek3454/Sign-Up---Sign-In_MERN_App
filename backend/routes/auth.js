const express = require('express');
const { signup, signin, getuser, logout } = require('../controler/authControler');
const jwtAuth = require('../middleware/jwtAuth');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/user', jwtAuth, getuser);
router.get('/logout', logout);

module.exports = router