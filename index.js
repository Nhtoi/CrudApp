const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Product = require("./models/product.model.js")
const productRoute = require("./routes/product.route.js")
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
}));
//routes
app.use('/api/products', productRoute)

app.get('/', (rec, res)=>{
    res.send("Hello from Node API")
})

mongoose.connect("mongodb+srv://admin:hO5PBuN7sHROrpE9@backenddb.8u1uct3.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to DB")
    app.listen(3000, ()=>{
        console.log("Server is running on port 3000")
    })
})
.catch(()=>{
    console.log("Connection Failed")
})
