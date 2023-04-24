import { initMongoose } from "../../../../lib/initMongoose";
import User from 'models/User'
import bcrypt from 'bcrypt'
export default async function handler(req,res){

    await initMongoose()
    const foundUser = await User.findOne({email:req.body.email})
    //checking if another user exists with same email
    if(foundUser){
        console.log(foundUser)
         res.json({message:'Email Taken'})
    }
    else{
    //hashing password then saving user to db
    bcrypt.hash(req.body.password,10,(async (err,hash)=>{
        await User.create({
            fName:req.body.fName,
            lName:req.body.lName,
            email:req.body.email,
            password:hash,
            type:req.body.type,
        })
       }))
         res.status(201).json({message:'User Created'})
    }
}