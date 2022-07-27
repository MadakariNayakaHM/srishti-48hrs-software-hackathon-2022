const express= require('express');
const applyController=require('./../controllers/appliController');
const Router= express.Router();

Router.route('/applyEvent').post(applyController.applyEvent);
Router.route('/deleteApply/:id').delete(applyController.deletApply);

module.exports=Router;