const mongoose=require('mongoose')
const eventSchema = new mongoose.Schema({
    eventName:String,
    eventDate:String,
    eventTime:String,
    organizedBy:String,
    coOrdinator1:String,
    coOrdinator2:String,
    volenteer1:String,
    volenteer2:String,
    volenteer3:String,
    volenteer4:String,
    photo:String
})

const events = mongoose.model('events',eventSchema);
module.exports=events
