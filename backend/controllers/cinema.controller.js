const Cinema= require('../models/Cinema.model');

const  getAllCinemas=async(req,res)=>{
    try {
        const cinemas= await Cinema.find();
        res.json(cinemas);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports={getAllCinemas};