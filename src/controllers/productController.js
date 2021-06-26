const fs = require('fs')
const path = require('path')
let { check, validationResult, body} = require('express-validator');
const DB = require('../database/models');
const OP = DB.Sequelize.Op

// Fijarse la base de datos y cambiarle el nombre

//let rutaJson = path.join (__dirname,'../data/productsDataBase.json');
//const productos = JSON.parse(fs.readFileSync(rutaJson ,'utf-8'));


// Fijarse bien los metodos y las páginas

let productController = {
    detail: async function(req, res) {
      try {
        const products = await DB.Product.findOne({
            where: {id:{[OP.like]: req.params.idProduct}}
        })
         const otrosProducts = await DB.Product.findAll({
             where: {[OP.and]:
              [{id: {[OP.ne]: products.id}},
              {[OP.or]:
               [{tipo_id: {[OP.like]: products.tipo_id}},
               {marca_id: {[OP.like]: products.marca_id}}]
                }
              ]},
              limit: 3
        })
        const users = await DB.User.findOne({
          where: {id: {[OP.like]: req.session.userId}}
        })
        let sessionUserId = req.session.userId
        let carritoUserId = req.session.carrito
        if (typeof products == null){
                res.send("No encontramos un producto para mostrarte")
        }
        else {
          res.render('detalle', {products, sessionUserId, users, otrosProducts, carritoUserId})
        }
      }
      catch (error) {
        res.send(error)
      }
    },
      pruebas: async (req, res) => {
        try {
            const products = await DB.Product.findAll({
              include: ['Marca']
          })
        res.render('productB', {products})
        }
        catch (error){
            res.send(error)
        }
      }, 
      products: async (req, res) => {
        try {
            const products = await DB.Product.findAll({
          })
            const marcas = await DB.Marca.findAll({

          })
          const users = await DB.User.findOne({
            where: {id: {[OP.like]: req.session.userId}}
          })
          let sessionUserId = req.session.userId
          let carritoUserId = req.session.carrito
        res.render('product', {products, marcas, sessionUserId, users, carritoUserId})
        }
        catch (error){
            res.send(error)
        }
      },
      create: async function (req,res,next) {
        try{
        const marcas = await DB.Marca.findAll()
        const tipos = await DB.Tipo.findAll()
        const users = await DB.User.findOne({
          where: {id: {[OP.like]: req.session.userId}}
        })
        let sessionUserId = req.session.userId
        let carritoUserId = req.session.carrito
        res.render('formulario-producto', {marcas, tipos, sessionUserId, users, carritoUserId})
        }
        catch (error){
          res.send(error)
        }
      },
      guardar: async ( req, res, next) => {
        let errors = validationResult(req);
        const users = await DB.User.findOne({
          where: {id: req.session.userId}
        })
        let sessionUserId = req.session.userId
        let carritoUserId = req.session.carrito
        if (errors.isEmpty()) {
                try{
                    await DB.Product.create(
                      {...req.body, 
                      imagen: req.files[0].filename,
                      user_id: req.session.userId})
                    res.redirect('/products')
                }
                catch (error){
                    res.send(error)
                }
        }
        else {
        return res.render('formulario-producto', {sessionUserId, users, carritoUserId})
        }
    },
      editar: async function (req, res) {
        try {
          const products = await DB.Product.findOne({
          where: {id:{[OP.like]: req.params.idProduct}}
        })
          const marcas = await DB.Marca.findAll({})
          const tipos = await DB.Tipo.findAll({})
          const users = await DB.User.findOne({
            where: {id: req.session.userId}
          })
          let sessionUserId = req.session.userId
          let carritoUserId = req.session.carrito
        if (typeof products == null){
          res.send("No encontramos un producto para mostrarte")
        }
        else {
          res.render('formulario-producto-edit', {products, marcas, tipos, sessionUserId, users, carritoUserId})
        }
      }
        catch (error){
          res.send(error)
        }
        },
      editado: async function (req, res) {
        try {
          console.log(req.body);
          if (!req.files[0]) {
           await DB.Product.update(req.body,{
             where: {id: req.params.idProduct}
            })
          }
          else {
            await DB.Product.update(
              {...req.body,
              imagen: req.files[0].filename},
              {where: {id: req.params.idProduct}}
          )
          }
            res.redirect('/products/detail/'+ req.params.idProduct)
        }
        catch (error){
          res.send(error)
        }
       },
       delete: async function (req, res) {
         try{
          await DB.Product.destroy({
            where: {id: req.params.idProduct}
        })
          res.redirect('/products')
          }
        catch (error){
              res.send(error)
          }
       },
       carrito: async (req,res,next) => {
        try{
          const users = await DB.User.findOne({
            where: {id: req.session.userId}
          })
          const marcas = await DB.Marca.findAll({})
          let sessionUserId = req.session.userId
          const carrito = await DB.Carrito.findAll({
            where: {user_id: req.session.userId},
            include: ['Marca', 'Tipo']
          })
          req.session.carrito = carrito.length
          let carritoUserId = req.session.carrito
          console.log(marcas);
          res.render('carrito', {users, carrito, sessionUserId, carritoUserId, marcas})
          }
        catch (error){
          res.send(error)
        }
      },
        addCarrito: async (req,res,next) => {
          try{
            const product = await DB.Product.findOne({
              where: {id: req.body.productId}
            })
            const user = await DB.User.findOne({
              where: {id: req.session.userId}
            })
            await DB.Carrito.create({
              nombre: product.nombre,
              marca_id: product.marca_id,
              tipo_id: product.tipo_id,
              precio: product.precio,
              descripcion: product.descripcion,
              unidades_requeridas: req.body.unidades_requeridas,
              descuento: product.descuento,
              user_id: user.id,
              imagen: product.imagen,
              product_id: product.id
            }) 
            await DB.Product.update(
              {unidades_disponibles: product.unidades_disponibles - req.body.unidades_requeridas},
              {where: {id: req.body.productId }}
              )
            res.redirect('/products/carrito')
          }
          catch (error){
            res.send(error)
          }
        },
        deleteCarrito: async (req,res,next) => {
          try{
            let carrito = await DB.Carrito.findOne({
              where: {id: req.params.idProduct}
            })
            const product = await DB.Product.findOne({
              where: {id: carrito.product_id}
            })
            await DB.Product.update(
              {unidades_disponibles: product.unidades_disponibles + carrito.unidades_requeridas},
              {where: {id: carrito.product_id}}
            )
            await DB.Carrito.destroy({
              where: {id: req.params.idProduct}
          })
            console.log(req.session.carrito);
            res.redirect('/products/carrito')
            }
          catch (error){
                res.send(error)
            }
        } 
};




module.exports = productController;