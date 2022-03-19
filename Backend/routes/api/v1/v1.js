const express = require('express');
const router = express.Router();
const { verifyApiHeaderToken } = require('./headerVerifyMiddleware');
// const middlewares = require('./headerVerifyMiddleware');
const clientesRoutes = require('./clientes/clientes');

//middlewares
router.use(
    '/clientes',
    verifyApiHeaderToken,
    clientesRoutes
);
//router.use('/expedientes', expedientesRoutes);
module.exports = router;