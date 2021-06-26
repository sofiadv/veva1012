module.exports = (sequelize,DataTypes) => {
    const trago = sequelize.define(
        'Trago',
        {
            nombre:DataTypes.STRING,
            ingredientes:DataTypes.STRING,
            imagen:DataTypes.STRING,
            preparacion:DataTypes.STRING
        },
        {
            timestamps: false,
        }
    ) 
    return trago
}