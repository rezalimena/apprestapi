var express = require('express');
var auth = require('./auth');
var verifikasi= require('./verifikasi');
var router = express.Router();

router.post('/api/v1/register',auth.registrasi);
router.post('/api/v1/login',auth.login);

router.get('/api/v1/auth',verifikasi(2),auth.authPage);

module.exports = router;
