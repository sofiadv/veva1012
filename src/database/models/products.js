module.exports = (sequelize,DataTypes) => {
    const product = sequelize.define(
        'Product',
        {
            nombre:DataTypes.STRING,
            marca_id:DataTypes.INTEGER,
            tipo_id:DataTypes.INTEGER,
            precio:DataTypes.STRING,
            descripcion:DataTypes.STRING,
            unidades_disponibles:DataTypes.INTEGER,
            descuento:DataTypes.INTEGER,
            user_id:DataTypes.INTEGER,
            imagen:DataTypes.STRING
        },
        {
            timestamps: false
        }
    )
    product.associate = (models) => {
        product.belongsTo(models.Marca)
        product.belongsTo(models.Tipo)
        product.belongsTo(models.User)
        product.hasMany(models.Carrito)
    }
    return product
}