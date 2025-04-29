import mongoose from "mongoose";

export interface IUser extends Document {
    email:{
        type:String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    fullname:{type:String},
    points:Number
  }

export const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    fullname:{type:String},
    points:Number
  
})

export const User = mongoose.model('User',UserSchema);