const express = require("express");
const connectDB = require("./config/db"); 
require("dotenv").config();
const cinemasRoute = require('./routes/api/cinemas.routes.js');


const app = express();

connectDB();

app.use(express.json());


//using the routes
app.use('/api/cinemas', cinemasRoute);



app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
