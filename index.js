//index.js
const mongoose=require('mongoose')
console.log("connecting to mongodb")

//import the config module
const config=require('./utils/config')
const app =require('./app')

mongoose.connect(config.MongoDB_URI)
.then(()=>{
    console.log('connected to the mongoodb')
    app.listen(config.PORT,()=>{
        console.log(`server is listening in ${config.PORT}`)
    })
    
}).catch((error)=>{
    console.log('error connecting to the mongodb',error.message)
})


