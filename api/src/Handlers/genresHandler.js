//Handler se encarga de manera interna de decidir a que controller llamar y que hacer con la informacion que me puede llegar por:
//query - params - body Y responder
const { createGenreDB } = require("../controllers/genresControllers")

const genresHandler =  async (req,res)=>{
    try{
        const newGenre = await createGenreDB()
        res.status(200).json({newGenre})
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

module.exports = genresHandler;