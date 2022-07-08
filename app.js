const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  //console.log(firstName , lastName , email);
  const data = {
    members:[
      {
        email_address : email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us10.admin.mailchimp.com/3.0/lists/0bdc7e14cf";
  const options = {
    method:"POST",
    auth:"bhavarth7:81834a03cc85ffb2e01fe767bcf2d2a2-us10"
  }

  const request = https.request(url,options,function(response){
    response.on("data",function(data){
      //const k = JSON.parse(data);
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
})
app.listen(3000,function(){
  console.log("server is running on 3000 port.");
})

/*
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const request = require("request");
const https = require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
// get method to route the home page

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailId = req.body.emailID;
//  console.log(firstName , lastName , emailId);
  const data={
    members:[
      {
        email_address: emailId,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
//var d = JSON.parse(data);
  const url = "https://us10.api.mailchimp.com/3.0/lists/0bdc7e14cf";
  const options = {
    method:"POST",
    auth:"bhavarth:81834a03cc85ffb2e01fe767bcf2d2a2-us10"
  }
  const request = https.request(url,options,function(response){
    if(response.statusCode===200)
    {
      res.send("Successfully Subsribed.");
    }
    else{
      res.send("Please try again, their is some error.");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));

    })
  })
request.write(jsonData);
request.end();
});

app.listen(3000,function(){
  console.log("Server is running on port 3000.");
});


*/
//API key: 81834a03cc85ffb2e01fe767bcf2d2a2-us10
// list id: 0bdc7e14cf
//0bdc7e14cf
