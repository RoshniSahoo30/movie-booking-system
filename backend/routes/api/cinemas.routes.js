const express= require('express');
const router=express.Router();

const {getAllCinemas}= require('../../controllers/cinema.controller.js');


router.get('/',getAllCinemas);

module.exports=router;