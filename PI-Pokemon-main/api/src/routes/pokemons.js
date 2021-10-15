const axios = require("axios");
const { Router } = require('express');
const {Pokemon, Types} = require('../db')
const router = Router();


router.get("/", async(req, res)=>{ 
  try{
    const {name} = req.query

    if(name){
      const bdBuscar = await Pokemon.findOne({where:{nombre: name}, include: Types})

      if(bdBuscar){
         const todos = [{
      id: bdBuscar.id,
      nombre:bdBuscar.nombre,
      vida:bdBuscar.vida,
      fuerza:bdBuscar.fuerza,
      defensa:bdBuscar.defensa,
      velocidad:bdBuscar.velocidad,
      peso:bdBuscar.peso,
      altura:bdBuscar.altura,
      imagen:bdBuscar.imagen,
      types:bdBuscar.types.map(e=>e.dataValues.nombre)
      }]
  return res.json(todos)

      }else{
        const apiBuscar = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const aux =[{
          Id:apiBuscar.data.id, 
          nombre:apiBuscar.data.name,
          types:apiBuscar.data.types.map(e=>e.type.name),    
          vida: apiBuscar.data.stats[0].base_stat,
          fuerza: apiBuscar.data.stats[1].base_stat,
          defensa: apiBuscar.data.stats[2].base_stat,
          velocidad: apiBuscar.data.stats[5].base_stat,
         peso: apiBuscar.data.weight,
          altura: apiBuscar.data.height,
          imagen: apiBuscar.data.sprites.other.dream_world.front_default
      }]
      return res.send(aux)

      }
  
     
    }else{
      
      const api = await axios.get( "https://pokeapi.co/api/v2/pokemon")
      const response = await Promise.all(api.data.results.map(async pokemon =>{
      let URL = await axios.get(pokemon.url)
      let type = URL.data.types.map(el => el.type.name)
        return {
          nombre: URL.data.name,
          imagen: URL.data.sprites.other.dream_world.front_default ,
          types: type,
         fuerza: URL.data.stats[1].base_stat,
         id: URL.data.id
  
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
    return res.json(err)
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
      nombre:p.nombre,
      vida:p.vida,
      fuerza:p.fuerza,
      defensa:p.defensa,
      velocidad:p.velocidad,
      peso:p.peso,
      altura:p.altura,
      imagen:p.imagen,
      types:p.types.map(e=>e.dataValues.nombre)
      }
  return res.json(todos)

}else{
 


 const detalles = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
 const idPokemon = {
     id: detalles.data.id,
     nombre: detalles.data.name,
     imagen: detalles.data.sprites.other.dream_world.front_default ,
     types: detalles.data.types.map(e => e.type.name),
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
    res.json(err)
  }

})

router.post('/' , async (req, res)=>{
  const  { nombre,imagen,types,vida,fuerza,defensa,velocidad,altura,peso } = req.body;
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
  
 
    if(types && types.length > 0){
    for(tipo of types){
      var newType = await Types.create({nombre:tipo})
        await newPokemon.addType(newType)
    }
 
    }
    return res.status(201).json("Pokemon creado");
  }catch(err) {
    res.json(err)
    }
})


module.exports = router;
