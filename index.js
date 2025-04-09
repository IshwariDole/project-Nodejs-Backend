const express = require('express');
const cors= require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User')

const server=express();
server.use(cors());
server.use(bodyParser.json());

mongoose.connect('mongodb+srv://Ishwari:Ishwari%402004@cluster0.aql11yz.mongodb.net/').then(()=>console.log("database connected!!")).catch(()=>console.log(err))

server.post('/register',async(req,res)=>{
    try{

        const {fullName,userName,age,password}=req.body
        const userObj=new User({fullName,userName,age,password})
        await userObj.save()
        res.json({
            status:true,
            message:'user Successfully added'
        })

    }catch(err){
        res.json({
            status:false,
            message:`${err}`
        })
    }
})

server.post('/login',async(req,res)=>{
    try{
        const {userName,password}=req.body
        const userExist=await User.findOne({userName})
         if(!userExist){
            return res.json({
                status:false,
                message:"user not found"
            })
         }
         if(password!==userExist.password){
            return res.json({
                status:false,
                message:"wrong password"
            })
         }

         res.json({
            status:true,
            message:"login successful"
         })

    }catch(err){
        res.json({
            status:false,
            message:`${err}`
        })
    }
})

server.listen(8055,()=>{
    console.log('server started at port 8055')
})