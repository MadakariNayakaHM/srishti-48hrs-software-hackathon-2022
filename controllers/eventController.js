const event=require('./../models/eventModel');
const user=require('./../models/userModel');
const multer=require('multer');
const sharp=require('sharp');
const jwt=require('jsonwebtoken');
const Sendmail=require('../email');

exports.createEvent = async (req,res,next)=>
{
    try{
        const newEvent=await event.create(req.body);
    res.status(200).json({status:"success",data:newEvent})

    const message=`new event is created ,event name:- ${newEvent.eventName} by 
    ${newEvent.organizedBy} on ${newEvent.eventDate} at ${newEvent.eventTime} so 
    please do register to be a part of the event`
    try{
      await Sendmail({
      email:process.env.volenteer_email,
      subject:`New event has been created`,
      message
    });
    
    } catch(err){console.log("error while sending email")}
    }catch(err){console.log("erroe at event creation")
console.log(err)}
} 



exports.updateOneEvent=async (req,res,next)=>
{
    try{
        const data={
            coOrdinator1:req.body.coOrdinator1,
            coOrdinator2:req.body.coOrdinator2,
            volenteer1:req.body.volenteer1,
            volenteer2:req.body.volenteer2,
            volenteer3:req.body.volenteer3,
            volenteer4:req.body.volenteer4,
            photo:req.file.filename
        }
        const updated=await event.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        req.body.photo=req.file.filename;
        return res.status(201).json({status:"success",data:updated});
    }catch(err){console.log("error at update event");
console.log(err);}
}

exports.deleteEvent=async(req,res,next)=>{
    await event.findByIdAndDelete(req.params.id);
    res.status(200).json({status:"success",data:null})
}


 const multerStorage = multer.memoryStorage();
 
const multerFilter=(req,file,cb)=>
{
  if(file.mimetype.startsWith('image'))
  {
    cb(null,true)

  }
  else
  {
cb((req,res)=>{res.status(404).json({status:'fail',message:'upload images only'})},false);
  }
}

exports.upload=multer({
  storage:multerStorage,
  
  fileFilter: multerFilter
  
})
exports.resizePhoto =async (req,res,next)=>{
  if(!req.file){return next()}
  
  req.file.filename=`event-${Date.now()}.jpeg`

  console.log(req.file)
  await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:90}).toFile(`public/images/event/${req.file.filename}`)
  next();
}

exports.displayOneEvent= async (req,res,next)=>
{
  try{
    const oneEvent= await event.findById(req.params.id);
  res.status(200).json({status:"success",oneEvent});
  }catch(err){
    console.log("error in display one event");
    console.log(err);
  }
}