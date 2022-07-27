const express=require('express');
const jwt = require('jsonwebtoken');
const { promisify } = require("util");
const user=require('./../models/userModel');
const sendEmail=require('../email');
const Token=(id)=>
{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES})
}
const createToken=(User,res)=>{
   const token = Token(User._id);
   const cookieOptions={
        expires:new Date(Date.now()+60*24*60*60),
        httpOnly:true,
        secure:true
    };
    res.cookie('jwt',token,cookieOptions);
}
exports.signUp=async (req,res,next)=>{
    try{
        const newUser= await user.create(req.body);
       const token=  Token(newUser._id);
       createToken(newUser,res);
        res.status(200).json({status:"success",
        token,

    data:newUser});
const message="you are added to our family"
    try{
      await sendEmail({
      email:newUser.email,
      subject:`welcome mail from code hackers`,
      message
    });
    
    } catch(err){console.log("error while sending email")}
    }
    catch(err){
        console.log("error at signup");
        console.log(err);
    }
}

exports.login = async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      console.log(email,password)
      if(!email || !password)
      {
        res.status(400).json({status:'fail',
    meaasge:"incorrect email or password"});
      }

      const User= await user.findOne({email:email});
    //   console.log(User);

      if(!User||(await !User.correctPassword(password,User.password)))
      res.status(400).json({status:"fail",message:"incorrect email or password"})

      createToken(User,res);
     const token = Token(User._id);
     res.status(200).json({status:"success",token,data:User})

     const message="you are loged in as a volenteer , if you really want to be a part of the organization by applying for some events for some roles"
    try{
      await sendEmail({
      email:User.email,
      subject:`you are logged in as ${User.name}`,
      message
    });
    
    } catch(err){console.log("error while sending email")}
    
    } catch (err) {
        console.log("erroe at login")
      console.log(err);
    }
  };

//   exports.protect = async (req, res, next) => {
//     let token;
//     try {
      
//       if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//       ) {
//         token = req.headers.authorization.split(" ")[1];
//       } 
//       if(req.cookies.jwt){
//         token=req.cookies.jwt;
//       }
  
//       if(!token)
//       {
//        return res.status(404).json({ status: "fail", message: "login 1st" });
//       }
//     //   if (!req.cookies.jwt)
//     //   {
//     //     res.status(404).json({ status: "fail", message: "login 1st" });
//     //   }
  
//       const decoded = await promisify(jwt.verify)(
//         token,
//         process.env.JWT_SECRET
//       ).catch((err) => {
//        return res.status(401).json({ message: "expired token!!!" });
//       });
//       const idUser = jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{return decoded.id})
//       const currentUser= await user.findById(idUser);
//       res.locals.user = currentUser
     
//       // const decoded=jwt.verify(token,process.env.JWT_SECRET,function(err,decoded){return decoded.id});
  
//       next();
//     } catch (err) {
//       console.log("error occureed at protect function");
//       console.log(err)
//     }
//   };

  exports.ristrictTo = (...roles) => {
    try {
      return async (req, res, next) => {
        let token;
  
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
        ) {
          token = req.headers.authorization.split(" ")[1];
        }

       

       else if(res.cookies.jwt)
        token=res.cookies.jwt
  
        if (!token) {
          res.status(404).json({ status: "fail", message: "login 1st" });
        }
  
        let userId = jwt.verify(
          token,
          process.env.JWT_SECRET,
          function (err, decoded) {
            return decoded.id;
          }
        );
        let User = await user.findById(userId);
        // /console.log(user);
        console.log(User.roles);
        if (!roles.includes(User.roles)) {
          res.status(401).json({ message: "you are not authenticated" });
        }
        next();
      };
    } catch (err) {
        console.log("error occurred at ristrict to function");
      console.log(err);
    }
  };