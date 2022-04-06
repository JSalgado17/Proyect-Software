const express = require('express');
const router = express.Router();
const { verifyApiHeaderToken } =
require('./headerVerifyMiddleware');

//const {passport, jwtMiddleware} = require('./seguridad/jwtHelper');

//*****routes*****


const seguridadRoutes = require('./seguridad/seguridad');
const habitacionesRoutes = require('./habitaciones/habitaciones');
//public
router.use('/seguridad', verifyApiHeaderToken, seguridadRoutes);
router.use('/habitaciones', habitacionesRoutes)

module.exports = router;