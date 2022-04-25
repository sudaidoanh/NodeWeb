const express = require('express');
const router = express.Router();

const Auth = require('../app/middlewares/AuthMiddle')

router.get('/login',Auth.login);
router.post('/login',Auth.login);
router.post('/register',Auth.register);
router.all('/logout',Auth.logout);

module.exports=router