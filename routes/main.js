const router = require('express').Router();

router.get('/',(req,res)=>{
    res.send('Api user en funcion')
})


module.exports  = router