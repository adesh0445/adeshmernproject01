const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    phone:{
        type:String,
    },
    email:{
        type:String,
    },
    gender:{
        type:String,
    },
})

const User=mongoose.model('worker',userSchema);
module.exports=User;