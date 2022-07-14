    const router = require('express').Router();
    const express = require('express')
    const usuario_DAO  = require('../controller/usuarioDAO')
    const usuario_obj =  require('../controller/usuario')
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const myPlaintextPassword = 's0/\/\P4$$w0rD';
    const someOtherPlaintextPassword = 'not_bacon';
    const jwt = require('jsonwebtoken');
    
    router.get('/',(req,res)=>{
        var hash_;
        res.send('Hola prueba')

       
    });

router.post('/usuarioNuevo', async (req,res)=>{
    nombre = req.body.nombre
    apellido = req.body.apellido
    correo_electronico =  req.body.correo_electronico
    contrasenia = req.body.contrasenia
    ciudad = req.body.ciudad
    estado =  req.body.estado
    edad = req.body.edad
    nombre_rancho = req.body.nombre_rancho
    url_image = req.body.url_image
    
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(contrasenia, salt, function (err, hash) {
        //   console.log(hash);
          
          const Usuario = {
            nombre : nombre,
            apellido : apellido,
            correo_electronico : correo_electronico,
            contrasenia : hash,
            ciudad : ciudad,
            estado : estado,
            edad : edad,
              nombre_rancho : nombre_rancho,
            url_image : url_image
    
        }
    
         
        const usuario = usuario_DAO.controller.create(Usuario)
    
        res.json(usuario)
        });
      });
    // console.log('contrasenia has: '+contrasenia_a)


  
    })

    router.post('/actualizarUsuario', async (req,res)=>{

        id = req.body.id
        nombre = req.body.nombre
        apellido = req.body.apellido
        correo_electronico =  req.body.correo_electronico
        contrasenia = req.body.contrasenia
        ciudad = req.body.ciudad
        estado =  req.body.estado
        edad = req.body.edad
        rancho = req.body.nombre_rancho
        url_image = req.body.url_image

        const Usuario = {
            id : id,
            nombre : nombre,
            apellido : apellido,
            correo_electronico : correo_electronico,
            contrasenia : contrasenia,
            ciudad : ciudad,
            estado : estado,
            edad : edad,
            rancho : rancho,
            url_image : url_image

        }

        const usuario = await usuario_DAO.controller.modificar(Usuario);
        res.json(usuario)
    })

    router.get('/allUsuarios',async(req,res)=>{
        const usuario =  await usuario_DAO.controller.getAll()
        res.send(usuario)
    })
     //metodo que obtienes user, pasando JSON con correo y contraseña
    router.post('/getUserlogin',async(req,res)=>{

        const payload = {
            check:true
        };
        const token = jwt.sign(payload,'clavesecreta123',{
            expiresIn:'7d'
        });
        console.log(token)

        correo_electronico =  req.body.correo_electronico
        contrasenia = req.body.contrasenia

        const Usuario = {
            correo_electronico : correo_electronico,
        }

        const usuario = await usuario_DAO.controller.getUserEmailPass(Usuario)
        if (usuario == null){
            res.send({id: 'errorEmailPassword'});
        }else{
            const resultado = await bcrypt.compare(contrasenia, usuario.contrasenia);
            if(resultado == true){
                
                res.send(usuario);
            }else{
                res.send({id: 'errorEmailPassword'});
            }

        }
    });

    router.post('/getUserbyId',async(req,res)=>{
        id =  req.body.id

        const Usuario = {
            id : id,
        }

        const usuario = await usuario_DAO.controller.getUserbyId(Usuario)
        res.send(usuario)

    });

    const verificacion = express.Router()

    verificacion.use((req,res,next)=>{
        let token = req.headers['x-access-token'] || req.headers['authorization']
        // console.log(token)
        if(!token){
            res.status(401).send(
                {
                    error: 'es necesario un token'
                }
            )
            return
        }
        if(token.startsWith('Bearer ')){
            token = token.slice(7,token.length);
            console.log(token)
        }
        if(token){
            jwt.verify(token,"clavesecreta123",(error,decode)=>{
                console.log(error)
                if(error){
                    return res.json({
                        message: 'el token no es valido'
                    },)
                }else{
                    req.decode = decode;
                    next();
                }
            },)
        }
              
    });




    router.get('/info',verificacion,(req,res)=>{
        res.json('Informacion importante entregada')
    });




    module.exports = router;