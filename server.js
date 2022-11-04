const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    const cityName=req.body.cityName;
    const appid="6115a82b9c9cef3fd4d5c82e2677c6e8";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid="+appid;
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon=weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

            res.write("<p>The weather in "+cityName+" is currently "+weatherDescription+"</p>");
            res.write("<h1>The Temperature is "+temp+" degree Celcius</h1>");
            res.write("<img src="+imgURL+">");
            res.send();
        })
    })
     
})

app.listen(2300,()=>{
    console.log("server is running.")
})