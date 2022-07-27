const dotenv=require('dotenv');
const mongoose=require('mongoose');
dotenv.config({path:'./config.env'});
console.log(`-------${process.env.NODE_ENV} mode--------`);
const DB=process.env.DATA_BASE;
// console.log(DB)
mongoose.connect(DB).then(console.log("---connected to database successfully---")).catch()
const app=require('./app');
const port=3000;
app.listen(port,()=>{console.log(`---app is running at the port ${port}---`)});