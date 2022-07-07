    const router = require('express').Router();
    const usuario_DAO  = require('../controller/usuarioDAO')
    const usuario_obj =  require('../controller/usuario')
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const myPlaintextPassword = 's0/\/\P4$$w0rD';
    const someOtherPlaintextPassword = 'not_bacon';
    
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
    rancho = req.body.nombre_rancho
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
            rancho : rancho,
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
    router.get('/getUserlogin',async(req,res)=>{
        correo_electronico =  req.body.correo_electronico
        contrasenia = req.body.contrasenia

        const Usuario = {
            correo_electronico : correo_electronico,
        }

        const usuario = await usuario_DAO.controller.getUserEmailPass(Usuario)
        if (usuario == null){
            console.log('Correo o contraseña incorrecta')
        }else{
            const resultado = await bcrypt.compare(contrasenia, usuario.contrasenia);
            if(resultado == true){
                console.log('paso login')
            }else{
                console.log('Correo o contraseña incorrecta');
            }
            // falsy: false
        }
  
    
        res.send(usuario)
    });









    module.exports = router;