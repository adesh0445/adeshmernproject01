const mongoose=require('mongoose');
const EmployeesSchema=new mongoose.Schema({
    fullName:{
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

const Employees=mongoose.model('EmployeeData',EmployeesSchema);
module.exports=Employees;