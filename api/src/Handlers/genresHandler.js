
const genresHandler =  async (req,res)=>{
    try{

    }catch(error){
        res.status(400).json({error:error.message});
    }
}

module.exports = genresHandler;