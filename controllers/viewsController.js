const express= require('express');
const mongoose = require('mongoose')
const event=require('./../models/eventModel');
const apply=require('./../models/applyModel');
const users=require('./../models/userModel');

exports.homepage=async (req,res)=>{
   

    
  
    res.status(200).render('base');
}

exports.createEvent=async (req,res)=>{
    res.status(200).render('create');
}

exports.login=async (req,res)=>{
    res.status(200).render('login');
}
exports.signup=async (req,res)=>{
    res.status(200).render('signup');
}
exports.apply=async (req,res)=>{
    res.status(200).render('apply');
}
exports.viewEvents=async (req,res,next)=>
{
    const views= await event.find();
    res.status(200).render('viewEvent',{views})
}
exports.viewApplication=async (req,res,next)=>
{
    const applies= await apply.find();
    res.status(200).render('viewApp',{applies})
}
exports.updateEvent=async (req,res,next)=>
{
   
    res.status(200).render('updateEvent');
}

exports.adminDash=async (req,res,next)=>
{
    const user= await users.countDocuments({roles:"volenteer"});
    const applys= await apply.countDocuments()
    const events= await event.countDocuments();
    

    res.status(200).render('admin',{user,applys,events});
}

exports.leaderBoard=async (req,res,next)=>
{
  const a =  await event.countDocuments({volenteer1:"mahendra"});
  const b = await event.countDocuments({volenteer2:"virat"});
  const c = await event.countDocuments({volenteer3:"rohith"});
  const d= await event.countDocuments({volenteer4:"dinesh"});



  res.status(200).render('volenteer',{a,b,c,d});


}

exports.displayOneEvent=async (req,res,next)=>
{
    const events= await event.find();

    res.status(200).render('viewOneEvent',events);
}

