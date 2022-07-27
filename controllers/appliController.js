const apply=require('./../models/applyModel');

exports.applyEvent=async (req,res,next)=>{
    const newApply=await apply.create(req.body);
    res.status(200).json({status:'success',data:newApply});

}

exports.deletApply= async (req,res,next)=>
{
    await apply.findByIdAndDelete(req.params.id);

    res.status(201).json({status:'success',data:null});
}