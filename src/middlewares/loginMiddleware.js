const DB = require('../database/models');
const OP = DB.Sequelize.Op
const bcrypt = require('bcryptjs')
let { check, validationResult, body} = require('express-validator');

async function loginMiddleware(req, res, next) {
    try{
        const users = DB.User.findOne({
            where: {email: {[OP.like]: req.body.email}}
        })
        console.log(users);
        if (typeof users !== "undefined"){
            if (bcrypt.compareSync(req.body.password, user.password)) {
            
            next()
            }
        }
        else{
            let errors = {
                msg: "Contraseña incorrecta"
            }
            res.redirect('/user/login', {errors})
        }
    }
    catch (error){
        res.send(error)
    }
}

module.exports = loginMiddleware