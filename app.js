const express = require('express')
const app = express()
const https =  require('https')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true }))
app.get('/', function (req, res) {
    
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    console.log(req.body.cityName);
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.cityName +"&appid=c2d998b19c994cb982a607f9be61f27f"
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.feels_like
            const weatherDescription = weatherData.weather[0].description
            const icon =  weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + req.body.cityName + " is "+ temp +" degrees Celcius.</h1>");
            res.write("<img src=" + imageURL +">")
            res.send()
        })

    })
})








app.listen(3000, function(res,req){
    console.log("SERVER IS RUNNING ON PORT 3000");
})