module.exports = (sequelize, Sequelize) =>{

    const Usuario = sequelize.define('usuarios',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        nombre: Sequelize.STRING,
        apellido: Sequelize.STRING,
        correo_electronico: Sequelize.STRING,
        contrasenia: Sequelize.STRING,
        ciudad: Sequelize.STRING,
        estado: Sequelize.STRING,
        edad: Sequelize.INTEGER,
        nombre_rancho: Sequelize.STRING,
        url_image: Sequelize.STRING  
    }, { freezeTableName: true, timestamps: false });
    return Usuario;
}
    
    
