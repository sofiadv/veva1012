const DB = require('../database/models');
const OP = DB.Sequelize.Op

window.addEventListener('load', async function () {
    let qs = new URLSearchParams(location.search)
    let busqueda = qs.get("search_query")
    try {
        const product = await DB.Product.findAll({
            where: {nombre: {[OP.like]: busqueda}}
        })
        const marca = await DB.Marca.findAll({
            where: {nombre: {[OP.like]: busqueda}}
        })
        const product = await DB.Tipo.findAll({
            where: {nombre: {[OP.like]: busqueda}}
        })

    }
    catch (error){
        res.send(error)
    }
})