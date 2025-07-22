const mongoose=require('mongoose');
const connectToDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("mongodb is connect successfully");
        

    }
    catch(error){
        console.log("Cannot connect to mongodb",error);
        process.exit(1);

    }
}
module.exports = connectToDB; // exporting the connectToDB function
// this allows other files to use this function to connect to the database
