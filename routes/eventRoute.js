const express= require('express');
const authController=require('./../controllers/authController');
const eventController= require('./../controllers/eventController');
const Router = express.Router();

Router.route('/createEvent').post(eventController.createEvent)
Router.route('/updateEvent/:id').patch(eventController.upload.single('photo'),eventController.resizePhoto,eventController.updateOneEvent);
Router.route('/deleteEvent/:id').patch(eventController.deleteEvent);
Router.route('/updateEvent/:id').patch(eventController.updateOneEvent);
Router.route('/displayOneEvent/:id').get(eventController.displayOneEvent);
module.exports=Router;

// authController.ristrictTo("admin","program coordinator"),