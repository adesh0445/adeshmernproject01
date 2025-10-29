const mongoose=require('mongoose');

const datapattern=new mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String
    }
})

const mypattern=mongoose.model("workers",datapattern);/* workers naam ka Collection me datapattern type ka data dena h */

module.exports=mypattern;