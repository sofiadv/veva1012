const fs = require('fs')
var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth')
let { check, validationResult, body} = require('express-validator');
let adminMiddleware = require('../middlewares/adminMiddleware')

const mainController = require('../controllers/mainController')

/* GET home page. */
router.get('/', mainController.home)
router.get('/ofertas', mainController.ofertas)
router.get('/admin', adminMiddleware, mainController.admin)
router.get('/promos', mainController.promos)
router.get('/categorias', mainController.categorias)
router.get('/marcas', mainController.marcas)
router.get('/contacto', mainController.contacto)
router.get('/tragos', mainController.tragos)


module.exports = router;
