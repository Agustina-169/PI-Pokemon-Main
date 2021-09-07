const axios = require("axios");
const { Router } = require('express');
const {Pokemon, Types} = require('../db')
const router = Router();


router.get("/", async(req, res)=>{ 
  try{
    const {name} = req.query
    if(name){
      const bdBuscar = await Pokemon.findOne({where:{nombre:name}})
      if(bdBuscar){
        return res.json(bdBuscar)
      }else{
        const apiBuscar = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const aux ={
          Id:apiBuscar.data.id, 
          Pokemon:apiBuscar.data.name,
          Types:apiBuscar.data.types.map(e=>e.type.name),    
          Hp: apiBuscar.data.stats[0].base_stat,
          Attack: apiBuscar.data.stats[1].base_stat,
          Defense: apiBuscar.data.stats[2].base_stat,
          Speed: apiBuscar.data.stats[5].base_stat,
          Weight: apiBuscar.data.weight,
          Height: apiBuscar.data.height,
          Imagen: apiBuscar.data.sprites.other.dream_world.front_default
      }
      return res.send(aux)

      }
  
     
    }else{
    const api = await axios.get('https://pokeapi.co/api/v2/pokemon')
    const apiNext = await axios.get(api.data.next)
    const apiTodos = api.data.results.concat(apiNext.data.results)
    const response = await Promise.all(apiTodos.map(async pokemon =>{
    let URL = await axios.get(pokemon.url)
    let type = URL.data.types.map(el => el.type.name)
      return {
        name: URL.data.name,
        image: URL.data.sprites.other.dream_world.front_default ,
        types: type
      }
  }))

   const bD = await Pokemon.findAll({include: [{
    model: Types,
    through: {
      attributes: [],
    },
  }]})

   const todes = bD.concat(response)
    return res.json(todes)
    }
  }catch(err){
    return res.json("Pokemon no encontrado")
 } 
})

router.get("/:id",async(req, res )=>{
  
  const id =  req.params.id
  try{
 if(id.length > 3){
  
  const p = await Pokemon.findOne({
       where:{id},
       include: Types
     })
      const todos = {
      id: p.id,
      name:p.nombre,
      hp:p.vida,
      attack:p.fuerza,
      defense:p.defensa,
      speed:p.velocidad,
      weight:p.peso,
      height:p.altura,
      img:p.imagen,
      types:p.types.map(e=>e.dataValues.nombre)
      }
  return res.json(todos)

}else{
 


 const detalles = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
 const idPokemon = {
     id: detalles.data.id,
     nombre: detalles.data.name,
     tipos: detalles.data.types.map(e => e.type.name),
     vida: detalles.data.stats[0].base_stat,
     fuerza: detalles.data.stats[1].base_stat,
     defensa: detalles.data.stats[2].base_stat,
     velocidad: detalles.data.stats[5].base_stat,
     altura: detalles.data.height,
     peso: detalles.data.weight
 }
 return res.json(idPokemon);
}
 }catch(err) {
    res.json("Pokemon no encontrado")
  }

})

router.post('/' , async (req, res)=>{
  const  { nombre,imagen,tipos,vida,fuerza,defensa,velocidad,altura,peso } = req.body;
  try{
  const newPokemon = await Pokemon.create({
    nombre,
    imagen,
    vida,
    fuerza,
    defensa,
    velocidad,
    altura,
    peso
  })

    if(tipos && tipos !== ""){
      const arreglo = tipos.split(",")
      for(tipo of arreglo){
       let resTipo = await Types.create({nombre: tipo})
       console.log(resTipo)
       await newPokemon.addType(resTipo)
      }
    }
    return res.status(201).json("Pokemon creado");
  }catch(err) {
    res.json(err)
    }
})


module.exports = router;
