const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

 const publicDirectoryPath = path.join(__dirname,'../public');
 const viewDirectory = path.join(__dirname,'../templates/views')
 const partialsPath = path.join(__dirname,'../templates/partials')
 app.set('view engine','hbs')
 app.set('views',viewDirectory)
 app.use(express.static(publicDirectoryPath));
 hbs.registerPartials(partialsPath);

 app.get('',(req,res)=>{
     res.render('index',{
         title: 'Weather-app',
         name:'Venkata Sai Teja'
     })
 })
 app.get('/about',(req,res)=>{
     res.render('about',{
         about: 'Its an Weather-app',
         name: 'Venkata Sai Teja',
         title:'Weather-app'
     })
 })
 app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'Help is on the way',
        name: 'Venkata Sai Teja',
        title:'Weather-app'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must include an address'
        })
    }else {
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
         return res.send({
             error:'location not found'
         })
        }
    forecast(latitude,longitude, (error, forecastData) => {
        if(error){
           return res.send({
               error:'co-ordinates not found'
           })
        } 
    res.send({
        location,
        forecast: forecastData,
        address: req.query.address,
        latitude,
        longitude
        })
        })
})
} 
})

app.get('/products',(req,res)=>{
  if(!req.query.search){
        return res.send({
          error:'you must provide a search term'
      })
  }  
  res.send({
      products:[]
  })
})

app.get('/help/*',(req,res)=>{
    res.render('wrong',{
        error: 'This is wrong url and page not found'
    })
})

app.get('*',(req,res)=>{
     res.render('wrong',{
         error: 'This is wrong url and page not found'
     })
})
app.listen(3000,()=>{
    console.log('Server is running on 3000');
})