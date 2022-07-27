const validator=require('validator');
const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');

const userSchema=new mongoose.Schema({
    
    name:String,
    designation:{
        type:String,
        enum:["student","college","profession"]
    },
    phone:{
        type:Number,
        unique: true,
    },
    email:
    {
        type:String,
        unique: true,
    lowerCase: true,
    validate: [validator.isEmail, " valid mail id is required"],
    },
  
    roles: {
      type: String,
      default: "volenteer",
      enum: ["college", "admin", "program coordinator", "volenteer"],
    },
    password: {
      type: String,
      
      minlength: [8, "password should have 8 charecters"],
    },
    confirmPassword: {
      type: String,
     
      validate: {
        validator: function (el) {
          return el === this.password;
        },
      },
    },
    organizationName:String
    
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    
    next();
  });
  
  userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  

  const User = mongoose.model("User", userSchema);
module.exports = User;
