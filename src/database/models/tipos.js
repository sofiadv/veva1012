module.exports = (sequelize,DataTypes) => {
    const tipo = sequelize.define(
        'Tipo',
        {
            tipo:DataTypes.STRING,
            // categoria:DataTypes.STRING,
            // subcategoria:DataTypes.STRING
        },
        {
            timestamps: false,
        }
    ) 
    tipo.associate = (models) => {
        tipo.hasMany(models.Product)
        tipo.hasMany(models.Carrito)
    }   
    return tipo
}