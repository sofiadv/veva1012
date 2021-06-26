const fs = require('fs')
var express = require('express');
var router = express.Router();
const path = require('path')
const authMiddleware = require('../middlewares/auth')
const loginMiddleware = require('../middlewares/loginMiddleware')
const multer = require('multer')
let { check, validationResult, body} = require('express-validator');
//let rutaJson = path.join (__dirname,'../data/usersDataBase.json');
const DB = require('../database/models');
const OP = DB.Sequelize.Op
const bcrypt = require('bcryptjs')

//Ruta a la base de datos de producto. Cambiarle el nombre cuando se sepa

//const usuarios = JSON.parse(fs.readFileSync(rutaJson ,'utf-8') || '[]');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../comodin/public/images/avatar')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
})
   
  var upload = multer({ storage: storage })


const usersController = require('../controllers/usersController')

/* Rutas y controllers. */
router.get('/', usersController.listar)
router.get('/register', usersController.register)
router.post('/register', upload.any(),[
    check('first_name').not().isEmpty().withMessage('Este campo es obligatorio'),  
    check('last_name').not().isEmpty().withMessage('Este campo es obligatorio'),  
    check('email').isEmail().withMessage('Este campo debe contener un Email'), 
    check('password').isLength({min: 8}).withMessage('La contraseña debe tener por lo menos 8 dígitos'),
    check('repassword', 'La contraseña debe coincidir con la puesta en el campo anterior').custom((value, {req}) => (value === req.body.password))],  
    usersController.guardar)
router.get('/login', usersController.login)
router.post('/auth',[
      check('email').isEmail().withMessage('Este campo debe contener un Email'),
      check('password').not().isEmpty().withMessage('Contraseña incorrecta')],
      usersController.auth)
router.get('/profile',authMiddleware, usersController.profile)
router.put('/profile/edit',upload.any(), [
    check('first_name').not().isEmpty().withMessage('Este campo no puede quedar vacio'),  
    check('last_name').not().isEmpty().withMessage('Este campo no puede quedar vacio'),
    check('repassword', 'La contraseñas deben coincidir en ambos campos').custom((value, {req}) => (value === req.body.password))], 
    usersController.editado)
router.get('/profile/edit', usersController.edit)
router.get('/pruebas', usersController.pruebas)
router.delete('/delete', usersController.delete)
router.get('/logout', usersController.logout)
router.get('/email/:email', usersController.email)


module.exports = router;