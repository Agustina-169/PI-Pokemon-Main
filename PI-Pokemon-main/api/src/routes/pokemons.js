const axios = require("axios");
const { Router } = require('express');
const {Pokemon, Types} = require('../db')
const router = Router();


router.get("/", async(req, res)=>{ 
   
  const name = req.query.name
  if(name){
    try{
   const api = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`) 
   if(api){
   const aux ={
       Id:api.data.id, 
       Pokemon:api.data.name,
       Types:api.data.types.map(e=>e.type.name),    
       Hp: api.data.stats[0].base_stat,
       Attack: api.data.stats[1].base_stat,
       Defense: api.data.stats[2].base_stat,
       Speed: api.data.stats[5].base_stat,
       Weight: api.data.weight,
       Height: api.data.height,
       Imagen: api.data.sprites.other.dream_world.front_default
   }
   return res.send(aux)
   }else if(api.data === "Not Found"){
   var PokemonNameBd= await Pokemon.findOne({ where:{nombre: name}, include: Types});
    if(PokemonNameBd) {
      return res.status(200).send(PokemonNameBd)
    }
  }
}catch(err){
       console.log(err)
    }
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
     include: Types
 })

const pokeBd = Bd.map(e =>{
    return{
        name: e.nombre,
        image: e.imagen,
        types: [Types]
    }
  })
 console.log(pokeBd)
  const final = response.concat(pokeBd)
  return res.json(final) 
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
 }catch(err) {
    res.json(err)
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

router.post('/' , async (req, res)=>{
  const { nombre,imagen,tipo,vida,fuerza,defensa,velocidad,altura,peso } = req.body;
  try{
    const newPokemon = await Pokemon.create({
      nombre,
      imagen,
      tipo,
      vida,
      fuerza,
      defensa,
      velocidad,
      altura,
      peso
    })
    return res.status(201).json("pokemon creado");
  }catch(err) {
    res.json(err)
    }
})


module.exports = router;
