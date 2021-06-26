module.exports = (sequelize,DataTypes) => {
    const user = sequelize.define(
        'User',
        {
            first_name:DataTypes.STRING,
            last_name:DataTypes.STRING,
            email:DataTypes.STRING,
            password:DataTypes.STRING,
            avatar:DataTypes.STRING,
            rol:DataTypes.INTEGER
        },
        {
            timestamps: false
        }
    ) 
    user.associate = (models) => {
        user.hasMany(models.Product)
        user.hasMany(models.Carrito)
    }     
    return user
}