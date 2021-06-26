const fs = require('fs')
const path = require('path')
let { check, validationResult, body} = require('express-validator');
const DB = require('../database/models');
const OP = DB.Sequelize.Op

// Fijarse la base de datos y cambiarle el nombre

// let rutaJson = path.join (__dirname,'../data/productsDataBase.json');
// const productos = JSON.parse(fs.readFileSync(rutaJson ,'utf-8'));

// Fijarse bien los metodos y las páginas

let mainController = {
  contacto: function(req,res){
      let sessionUserId = req.session.userId
      let carritoUserId = req.session.carrito
      res.render('contacto', {sessionUserId, carritoUserId})
  },
    home: async function(req, res, next) {
        try{
          const products = await DB.Product.findAll({
            where: {unidades_disponibles:{[OP.gte]: 10}},
            //order: ['descuento', 'ASC'],
            limit: 6
          })
          const users = await DB.User.findOne({
            where: {id: {[OP.like]: req.session.userId}}
          })
          let sessionUserId = req.session.userId
          let carritoUserId = req.session.carrito

        res.render('index', {products, users, sessionUserId, carritoUserId});
        }
        catch (error){
          res.send(error)
        }
      },
      ofertas: function (req, res) {
        res.render('ofertasIndex', {productos})
      },
      admin: (req, res) => res.send('Bienvenido ' + req.query.user),
      promos: async (req,res) => {
        try{
          const products = await DB.Product.findAll({
            where: {descuento:{[OP.gte]: 30}},
          })
          const users = await DB.User.findOne({
            where: {id: {[OP.like]: req.session.userId}}
          })
          let sessionUserId = req.session.userId
          let carritoUserId = req.session.carrito
          res.render('promos', {products, users, sessionUserId, carritoUserId})
        }
        catch (error){
          res.send(error)
        }
      },
      categorias: async (req,res,next) => {
        try{
          const categoria = await DB.Tipo.findAll()
          res.send()
        }
        catch (error){
          res.send(error)
        }
      },
      marcas: async (req,res,next) => {
        try{
          const marcas = await DB.Marca.findAll()
          res.send()
        }
        catch (error){
          res.send(error)
        }
        res.send()
      },
      tragos: async (req,res,next) => {
        try {
          const users = await DB.User.findOne({
            where: {id: {[OP.like]: req.session.userId}}
          })
          const tragos = await DB.Trago.findAll()
          let carritoUserId = req.session.carrito
          let sessionUserId = req.session.userId
          res.render('tragos', {tragos, sessionUserId, carritoUserId, users})
        }
        catch (error){
          res.send(error)
        }
      }
    };



module.exports = mainController;