const axios = require("axios");
const { Router } = require('express');
const {Pokemon, Types} = require('../db')
const router = Router();


router.get("/", async(req, res)=>{ 
    try{
    const name = req.query.name
    if(name){
       
     const a = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
     const b = {
        id: a.data.id,
        nombre: a.data.name,
        tipos: a.data.types.map(e => e.type.name),
        vida: a.data.stats[0].base_stat,
        fuerza: a.data.stats[1].base_stat,
        defensa: a.data.stats[2].base_stat,
        velocidad: a.data.stats[5].base_stat,
        altura: a.data.height,
        peso: a.data.weight
       
    }
  
    return res.json(b);
  }
  
}catch(err) {
    res.json(err)
    }
      const pokemonApi = await axios.get("https://pokeapi.co/api/v2/pokemon")
 const pokemonApiNext = await axios.get(pokemonApi.data.next)
 const totalPokemon = pokemonApi.data.results.concat(pokemonApiNext.data.results)
 const response = await Promise.all(totalPokemon.map(async pokemon =>{
    let URL = await axios.get(pokemon.url)
    let type = URL.data.types.map(el => el.type.name)
    return {
        name: URL.data.name,
        image: URL.data.sprites.other.dream_world.front_default ,
        types: type
   } 
 }))
 const Bd = await Pokemon.findAll({
     include: [Types]
 })
  const pokeBd = Bd.map(e =>{
    return{
        name: e.name,
        image: e.image,
        types: e.type
    }
  })

  const final = response.concat(pokeBd)
  return res.json(final) 
})

router.get("/:id",async(req, res )=>{
 const id =  req.params.id
 if(id.length > 3){
     const p = await Pokemon.findOne({
       where:{id},
       include: Types
     })
      const todos = {
      id: p.id,
      name:p.name,
      hp:p.hp,
      attack:p.attack,
      defense:p.defense,
      speed:p.speed,
      weight:p.weight,
      height:p.height,
      img:p.img,
      types:p.types.map(e=>e.dataValues.name)
      }
  return res.json(todos)
 }
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
})

 


module.exports = router;
