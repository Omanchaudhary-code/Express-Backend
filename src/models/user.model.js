import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email must be unique"],
            lowercase: true,
            trim: true,
        },
        
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        avatar: {
            type: String,  //cloudinary url 
            required: true,
        },

        coverImage: {
            type: String
        },
        
        password: {
            type: String,
            required: [true, "Password is required"]
        },

        watchHistory: [ 
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
             } 
        ],

        refreshToken: {
            type: String 
        }


    },{timestamps: true});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

   this.password = await bcrypt.hash(this.password, 10)
   next() 
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

User.Schema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
User.Schema.methods.generateRefreshToken = function(){
     jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema);