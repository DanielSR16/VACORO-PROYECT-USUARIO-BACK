const usuarios_model =  require('../db/connection')

const Usuario = usuarios_model.db.usuario


    async function allUsuarios(){
        try {
            all_usuarios = await Usuario.findAll();
            return all_usuarios;
            
        } catch (error) {
            
        }
    }
    async function newUsuario(usuario){
            console.log('estoy en metodo')
            
            try{
                 crearUuario = await Usuario.create(usuario)
                
            }catch(err){
                return err
            }
    }

    async function updateUsuario(usuario){
        console.log(usuario)
        console.log('estoy en actualizar')
        try{
            resultado = await Usuario.update(usuario, {
                where: {
                    id: usuario.id
                }
            })
        }catch(err){
            return err
        }
    }

    async function getUserbyEmailAndPassword(usuario){
        console.log(usuario)
        
        try{
            resultado = await Usuario.findOne({
                where: {
                    correo_electronico : usuario.correo_electronico,
                },
                attributes: ['id','nombre','correo_electronico','contrasenia']
            })
            if (resultado === null) {
                return null
              } else {
                return resultado 
              
              }
        }catch(err){
            return err
        }
    }
async function getUserbyId(usuario){
    console.log(usuario)

    try{
        resultado = await Usuario.findOne({
            where: {
                id : usuario.id,
            },
            attributes: ['id','nombre','correo_electronico','contrasenia']
        })
        if (resultado === null) {
            return null
        } else {
            return resultado
        }
    }catch(err){
        return err
    }
}

    

controller = {}
controller.create = newUsuario
controller.getAll = allUsuarios
controller.modificar = updateUsuario
controller.getUserEmailPass = getUserbyEmailAndPassword
controller.getUserbyId = getUserbyId







module.exports = {controller}