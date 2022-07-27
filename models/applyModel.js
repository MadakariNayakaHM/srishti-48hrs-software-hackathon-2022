const mongoose=require('mongoose')
const applySchema = new mongoose.Schema({
    eventName:String,
    appliedRole:String,
    name:String,
    phone:Number,
    email:String
})

const apply = mongoose.model('apply',applySchema);
module.exports=apply
