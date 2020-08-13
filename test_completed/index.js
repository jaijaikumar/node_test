const express = require('express')
const morgan = require('morgan');
const app =express()
const port=2000
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const connection = require('./dbConnection');
const employee=require('./EmployeeData');

app.use(morgan('combined'));
const users=require('./middileware/users.json');
const cars=require('./middileware/users.json');
const jwt=require('jsonwebtoken');

//employee table creation
app.post('/api/v1/parse',async(req,res)=> {
  var regex = /([A-Z]{4})(\d{4})([A-Z]{7})(\d{3})(\d{7})/g;
  var str = req.body.data;
  
  let m = regex.exec(str);
  if (m !== null) {
    console.log(m.slice(1)); // prints ["ABC", "XYZ", "88"]
//  }
  var firstName=m.slice(1,2);
  var firstNameCon=m.slice(2,3);
  var lastName=m.slice(3,4);
  var lastNameCon=m.slice(4,5);


  var clientId=m.slice(5,6);
  const postEmployee = await new employee({
    firstName:firstName[0],
    lastName:lastName[0],
    clientId:clientId[0]
  });
  const saveEmployee =await postEmployee.save();
  res.status(200).json({"status":200,"data":{ "firstName": firstName[0] +firstNameCon[0],
  "lastName": lastName[0]+lastNameCon[0],
  "clientId": clientId[0],}});
} 
else{
res.status(403).json({"check":"check you input"});

}  
  });


  app.get('/api/v2/parse', async(req,res)=> {
    try{
     const EmployeeData =await employee.find({});
     //const getSecondSalary =await employee.find({});
   
     res.status(200).json({"status":200,"data":EmployeeData});  
   
    }
    catch(err){
      res.json({"err" :err});
   
    }
     
     });
   

app.listen(port,()=>console.log("server is running"))