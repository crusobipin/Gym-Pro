require("dotenv").config();
const express= require('express'); // this is the express module 
const app=express();
const connectToDB=require("./database/db");
const userRoutes=require("./routes/user-routes"); // importing the user routes
const gymRoutes=require("./routes/gym-routes"); // importing the gym routes
const trainerRoutes=require("./routes/trainer-routes"); // importing the trainer routes
const equipmentRoutes=require("./routes/equipment"); // importing the equipment routes
const gymClassesRoutes=require("./routes/gymClasses"); // importing the gym classes routes
const cors = require('cors'); // this is used to enable CORS in the application
app.use(cors()); // enabling CORS for all routes


const port=process.env.PORT || 3000;


connectToDB(); // calling the connectToDB function to connect to the database



app.use(express.json()); // this is used to parse the json data from the request body
app.use("/api/auth", userRoutes); // using the user routes for the /api/users endpoint
app.use("/api/gym", gymRoutes); // using the gym routes for the /api/gym endpoint
app.use("/api/trainer", trainerRoutes); // using the trainer routes for the /api/trainer endpoint
app.use("/api/equipment", equipmentRoutes); // using the equipment routes for the /api/equipment endpoint
app.use("/api/gymClasses", gymClassesRoutes); // using the gym classes routes for the /api/gymClasses endpoint
app.listen(port, ()=>{
    console.log(" server is running in the port",port) //THIS IS THE PORT WHERE THE SERVER IS RUNNING

})







// app.get('/',(req,res)=>{
// res.send("home pagev")
// })
