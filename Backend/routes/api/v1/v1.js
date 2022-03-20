const express = require('express');
const router = express.Router();
const { verifyApiHeaderToken } =
require('./headerVerifyMiddleware');

//const {passport, jwtMiddleware} = require('./seguridad/jwtHelper');

//*****routes*****


const seguridadRoutes = require('./seguridad/seguridad');

//public
router.use('/seguridad', verifyApiHeaderToken, seguridadRoutes);


module.exports = router;