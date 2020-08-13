const mongoose =require('mongoose');


const EmployeeData = mongoose.Schema({

    firstName :{
        type : String,
        required :true,
    },
    lastName :{
        type : String,
        required :true,
    },
     clientId :{
        type : String,
        required :true,
    },
});

module.exports=mongoose.model('employee_server_two',EmployeeData);