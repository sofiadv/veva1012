const fs = require('fs')
var express = require('express');
var router = express.Router();
const path = require('path')
const authMiddleware = require('../middlewares/auth')
const adminMiddleware = require('../middlewares/adminMiddleware')
const multer = require('multer')
let { check, validationResult, body} = require('express-validator');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../GC-Final/public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

//Ruta a la base de datos de producto. Cambiarle el nombre cuando se sepa

// let rutaJson = path.join (__dirname,'../data/productsDataBase.json');
// const productos = JSON.parse(fs.readFileSync(rutaJson ,'utf-8'));
const productController = require('../controllers/productController')

/* Rutas y controllers. */
router.get('/detail/:idProduct/', productController.detail);
router.get('/pruebas', productController.pruebas);
router.get('/', productController.products);
router.get('/create',adminMiddleware, productController.create);
router.post('/create', upload.any(),
//[
//   check('nombre ').not().isEmpty().withMessage('Este campo es obligatorio'),  
//   check('precio').not().isEmpty().withMessage('Este campo es obligatorio'),  
//   check('descuento').not().isEmpty().withMessage('Este campo es obligatorio'),  
//   check('unidades_disponibles').not().isEmpty().withMessage('Este campo es obligatorio'),  
//   check('descripcion').not().isEmpty().withMessage('Este campo es obligatorio'),  
//   check('imagen').not().isEmpty().withMessage('Este campo es obligatorio')],
productController.guardar);
router.get('/edit/:idProduct',adminMiddleware, productController.editar)
router.put('/edit/:idProduct', upload.any(), productController.editado)
router.delete('/delete/:idProduct',adminMiddleware, productController.delete)
router.get('/carrito', authMiddleware, productController.carrito)
router.post('/carrito', authMiddleware, productController.addCarrito)
router.delete('/carrito/delete/:idProduct', authMiddleware, productController.deleteCarrito)



module.exports = router;
