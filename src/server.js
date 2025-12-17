import connectDB from "./db/db.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./env"
})

app.use(express.static("public"));
app.use(express.json({limit:"16kb"}));


const PORT = process.env.PORT || 3000;

connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Chief, Your server has be started at port:http://localhost:${PORT}`);
    })
    
    app.on("Error", (error)=>{
        console.error("App failed to start", error);
        throw error;
    })
})
.catch((error)=>{
    console.log("MongoDB connection failed:", error);
    throw error;
})