module.exports = (sequelize,DataTypes) => {
    const carrito = sequelize.define(
        'Carrito',
        {
            nombre:DataTypes.STRING,
            marca_id:DataTypes.INTEGER,
            tipo_id:DataTypes.INTEGER,
            precio:DataTypes.STRING,
            descripcion:DataTypes.STRING,
            unidades_requeridas:DataTypes.INTEGER,
            descuento:DataTypes.INTEGER,
            user_id:DataTypes.INTEGER,
            imagen:DataTypes.STRING,
            product_id:DataTypes.INTEGER
        },
        {
            timestamps: false
        }
    )
    carrito.associate = (models) => {
        carrito.belongsTo(models.Marca)
        carrito.belongsTo(models.Tipo)
        carrito.belongsTo(models.User)
        carrito.belongsTo(models.Product)
    }
    
    return carrito
}