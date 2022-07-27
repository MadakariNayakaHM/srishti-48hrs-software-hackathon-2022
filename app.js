const express=require('express');
const app=express();
const pug = require('pug');
const path=require('path');

app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

const userRoutes=require('./routes/userRoute');
app.use('/cmrit/faculty',userRoutes);
const eventRoute=require('./routes/eventRoute');
app.use('/cmrit/faculty',eventRoute);
const viewsRoutes=require('./routes/viewsRoute');
app.use('/',viewsRoutes);
const applyRoutes=require('./routes/applyRoutes');
app.use('/cmrit/faculty',applyRoutes);

module.exports=app;