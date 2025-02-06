import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const connectionString =process.env.MONGODB_URI;
        //url that is needed to connect to the database 
        //<password> replace the copied password
        //create database and add it to mongodb.net/dev
        if (!connectionString) { // lets the developer identify possible hidden errors where the string becomes undefined
            throw new Error("No connection string found");
          }
        await mongoose.connect(connectionString);
        console.log("Connected to the Database");
    } catch (error) {
        console.log(error);
        console.log("Error connecting to the Database");
        
    }
}