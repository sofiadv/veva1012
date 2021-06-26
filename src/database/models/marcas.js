module.exports = (sequelize,DataTypes) => {
    const marca = sequelize.define(
        'Marca',
        {
            nombre:DataTypes.STRING,
            // categoria:DataTypes.STRING,
            // subcategoria:DataTypes.STRING
        },
        {
            timestamps: false,
        }
    ) 
    marca.associate = (models) => {
        marca.hasMany(models.Product)
        marca.hasMany(models.Carrito)
    }   
    return marca
}