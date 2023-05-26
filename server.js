const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const hostname="0.0.0.0";
const port=process.env.PORT || 3000;
const app=express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    res.render("index");
});

app.post("/",function(req,res){

    let cityName=req.body.cityName;
    let stateCode=req.body.stateName;
    let countryCode=req.body.Country;
    let url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+","+stateCode+","+countryCode+"&appid=53e37a8d6104bc2d046a939f49ef764c&units=metric"
    https.get(url,function(response){
        response.on("data",function(data){
            let weather_data=JSON.parse(data);
            let main=weather_data.weather[0].main;
            let description=weather_data.weather[0].description
            let temp=weather_data.main.temp
            res.write("<h1>The temperature is : "+temp+" </h1>");
            res.write("<h3>The weather is : "+main+" </h3>");
            res.write("<p>Description : "+description+" <p>");
            res.send();
        });
        
    })
});

app.listen(port,hostname,function(){
    console.log("server is started on port 3000.");
});
