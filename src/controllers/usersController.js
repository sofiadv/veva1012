const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
let { check, validationResult, body} = require('express-validator');
const DB = require('../database/models');
const OP = DB.Sequelize.Op


// Fijarse la base de datos y cambiarle el nombre

//let rutaJson = path.join (__dirname,'../data/usersDataBase.json');
//const usuarios = JSON.parse(fs.readFileSync(rutaJson ,'utf-8') || '[]');

// Fijarse bien los metodos y las páginas

let usersController = {
    register: ( req, res) => {
        let carritoUserId = req.session.carrito
     res.render('formulario-usuario', {carritoUserId})
    },
    guardar: async ( req, res, next) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
                try{
                    await DB.User.create(
                        {...req.body,
                        password: bcrypt.hashSync(req.body.password), 
                        avatar: req.files[0].filename,
                        rol: 0})
                    res.redirect('/users/login')
                }
                catch (error){
                    res.send(error)
                }
        }
        else {
        return res.render('formulario-usuario', {errors: errors.errors})
        }
    },
    login: (req, res) => {
        let carritoUserId = req.session.carrito
         res.render('login', {carritoUserId})
    },
    auth: async (req, res, next) => {
        let validation = validationResult(req);
        let errors = validation.errors
        let users = await DB.User.findOne({
            where: {email:{[OP.like]: req.body.email}}})
        const carrito = await DB.Carrito.findAll({
            where: {user_id: users.id}}) 
        if (users && validation.isEmpty()){   
        const autorizado = bcrypt.compareSync(req.body.password, users.password);
            if (autorizado) {
                req.session.userId = users.id
                req.session.category = users.rol
                req.session.carrito = carrito.length
                let sessionUserId = users.id
                let carritoUserId = req.session.carrito
                if (req.body.recordarme){
                    res.cookie('userCookie', users.id, {maxAge:1000000000000000})
                }
                if (!req.session.redirectTo){
                    res.render('perfil', {users, sessionUserId, carritoUserId})
                }
                else{
                    res.redirect(req.session.redirectTo)
                }
                //res.render('perfil', {users, sessionUserId})
            }
            else{
                res.render("login", {contra: 'Contraseña erronea'})
            }
        }
        else {
            res.render('login', {errors})
        }
    },
    listar: async (req, res) => {
        try {
            const users = await DB.User.findAll({
        })
        res.send(users)
        }
        catch (error){
            res.send(error)
        }
    },
    profile: async (req, res, next) => {
        try {
            const users = await DB.User.findOne({
                where: {id: req.session.userId}
            })
            let sessionUserId = users.id
            let carritoUserId = req.session.carrito
            res.render('perfil', {users, sessionUserId, carritoUserId})
        }
        catch (error){
            res.send(error)
        }    
    },
    edit: async function (req,res) {
        const users = await DB.User.findOne({
            where: {id: req.session.userId}
        })
        let sessionUserId = req.session.userId
        let carritoUserId = req.session.carrito
        res.render('perfil-edit', {users, sessionUserId, carritoUserId})
    },
    editado: async function (req, res) {
        let errors = validationResult(req)
        let sessionUserId = req.session.userId
        let carritoUserId = req.session.carrito
        const userViejo = await DB.User.findOne({
                where: {id: req.session.userId}
            })
        if (errors.isEmpty()){ 
            if (!req.body.password) {
                if (!req.files[0]){
                    await DB.User.update(
                        {...req.body,
                        password: userViejo.password},
                        {where: {id: req.session.userId}}
                    )}
                else {
                    await DB.User.update(
                        {...req.body,
                        avatar: req.files[0].filename,
                        password: userViejo.password},
                        {where: {id: req.session.userId}}
                    )
                }
                }
            else {
                if (!req.files[0]){
                    await DB.User.update(
                        {...req.body,
                            password: bcrypt.hashSync(req.body.password)},
                        {where: {id: req.session.userId}}
                    )
                }
                else {
                    await DB.User.update(
                        {...req.body,
                            avatar: req.files[0].filename,
                            password: bcrypt.hashSync(req.body.password)},
                        {where: {id: req.session.userId}}
                    )
                }
            }
            // if (req.files[0].filename){
            //     await DB.User.update({
            //     avatar: req.files[0].filename},
            //     {where: {id: req.session.userId}})
            // }
        }
        const users = await DB.User.findOne({
            where: {id: req.session.userId}
            })
            res.render('perfil', {users, sessionUserId, carritoUserId})
    },
    pruebas: async (req,res,next) => {
    try {
        const user = await DB.User.findAll({
    })
    res.render('PerfilP')
    }
    catch (error){
        res.send(error)
    }
    },
    delete: async function (req, res) {
        try{
         await DB.User.destroy({
           where: {id: req.session.userId}
       })
         req.session.destroy()
         res.cookie('userCookie', null, {maxAge: 1})
         res.redirect('/')
         }
       catch (error){
             res.send(error)
         }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.cookie('userCookie', null, {maxAge: 1})
        res.redirect('/')
    },
    email: async (req, res) => {
        try{
            const user = await DB.User.findOne({
                where: {email: req.params.email }
            })
            console.log(user.email);
            if (user){
                res.json("Email existente")
            }
            else {
                res.json("Email válido")
            }
        }
        catch (error){
            res.send("Hay un error")
        }
    }
};

module.exports = usersController;