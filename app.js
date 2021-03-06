const express=require("express");
const bodyParser=require("body-parser");
const request = require("request");
const https = require("https");
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){
	res.sendFile(__dirname +"/signup.html");
});
app.post("/", function(req, res){
	const firstname = req.body.fname;
	const lastname=req.body.lname;
	const email=req.body.email;
	
	const data={
		members:[
		{
			email_address: email ,
			status: "subscribed" ,
			merge_fields:{
				FNAME:firstname ,
				LNAME:lastname 
			
			}
		}
		]
	};

	const jsonData=JSON.stringify(data);
	const url='https://us1.api.mailchimp.com/3.0/lists/e8de8d7db0';
	const options={
		method: "POST",
		auth: "avijit9:50970cb38b87141d6ad874bc4e23ac34-us1"
	}
	const request=https.request(url,options,function(response){
		if(response.statusCode===200){
			res.sendFile(__dirname+"/sucess.html");
		}
		else{
			res.sendFile(__dirname+"/faliure.html");
		}
		response.on("data",function(data){
			console.log(JSON.parse(data));
		})
	})

	request.write(jsonData);
	request.end();
});

app.post("/faliure",function(req,res){

res.redirect("/");
});



app.listen(process.env.PORT ||3000, function(){
	console.log("runing 3000 listening");
});
