//jshint esversion:6

const express = require("express")
const bodyParser =require("body-parser")
const request = require("request");

const https=require("https");
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.post("/",function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);

    const url="https://us12.api.mailchimp.com/3.0/lists/df4e2836f2"

    const options={
        method:"POST",
        auth:"arpita:67e558b0c41b61aa7dee021ee880636b-us12"
    }

    const request=https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/failure", function(req,res){
    res.redirect("/")
})

app.listen(3000,function(){
    console.log("Server is running on port 3000")
})

//API KEY
// 67e558b0c41b61aa7dee021ee880636b-us12

//LIST ID
// df4e2836f2