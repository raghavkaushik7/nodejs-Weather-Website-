const path= require('path')
const express=require('express')
const hbs= require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//It returns a function that returns a new express app.

const app = express()

//Define paths for Express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather App',
        name : 'Raghav'

    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
      title: 'About Me',
      name :"Raghav"        
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
      help_mssg: 'I am here to help you.',
      title:"Help",
      name:"Raghav"        
    })
})
 app.get('/weather',(req,res) => {
    if(!req.query.address){
       return  res.send("Please provide the address.")
    }  
        geocode (req.query.address,(error,{latitude,longitude,location}={}) => {
            if(error){
            return res.send({ error })
            }
        
          // console.log('Data',data)
        forecast(latitude,longitude, (error,forecastdata) => {
            if(error)
            {
            return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
          })
        })
    })
 })

 app.get('/help/*',(req,res) => {
     res.render('error',{
         title: 'Help Error',
         error_msg:'Help article not found',
         name:'Raghav'
        })
 })
 
 app.get('/products', (req,res) => {
     if(!req.query.search){
        return res.send({
            error:'You must provide a search term.'
        })
     }

    console.log(req.query.search)
    res.send({
        products: [] 
    })
})


 app.get('*',(req,res) => {
     
    res.render('error',{
        title:'404',
        error_msg:'Unknown request',
        name:'Raghav'
    })
 })

 
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
