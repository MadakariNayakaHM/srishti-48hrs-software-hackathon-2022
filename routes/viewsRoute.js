const express= require('express');
const viewsController=require('./../controllers/viewsController')
const Router = express.Router();


Router.route('/').get(viewsController.homepage);
Router.route('/createEvent').get(viewsController.createEvent);
Router.route('/login').get(viewsController.login);
Router.route('/signup').get(viewsController.signup);
Router.route('/applyEvent').get(viewsController.apply);
Router.route('/viewEvents').get(viewsController.viewEvents);
Router.route('/viewApplication').get(viewsController.viewApplication);
Router.route('/updateEvent').get(viewsController.updateEvent);
Router.route('/adminDash').get(viewsController.adminDash);
Router.route('/volenDash').get(viewsController.leaderBoard);
Router.route('/viewOneEvent').get(viewsController.displayOneEvent);



module.exports=Router;