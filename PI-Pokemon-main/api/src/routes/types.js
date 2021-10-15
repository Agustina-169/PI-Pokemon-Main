const { Router } = require('express');
const axios = require("axios");

const router = Router();
router.get('/', async function(req,res,next){
    try{
const todosApi = await axios.get("https://pokeapi.co/api/v2/type")
const soloTipos = todosApi.data.results.map((e)=> e.name)
return res.json(soloTipos)

}catch(err){
    return next(err)
}
})

module.exports = router;