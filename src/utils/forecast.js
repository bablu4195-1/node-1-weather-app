const request = require('postman-request');


const forecast = ((a,b,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=2c49455f8f4dd98ba4b9aef6e00b6392&query="+encodeURIComponent(a)+","+ encodeURIComponent(b) +"&units=f";
    request({url, json: true},(error,{body})=>{
        if(error){
            callback('response is not guaranted',undefined);
        } else if(body.error){
            callback('Unable to find weather info', undefined);
        } else {
            callback(undefined,{
                weather_descriptions: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                cloudclover: body.current.cloudcover,
                visibility: body.current.visibility
            })
        }
    })
})


  module.exports = forecast