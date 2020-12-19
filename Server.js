const express=require('express');
const mongoose=require("mongoose");
const app=express();
const bodyParser=require("body-parser");
const route1=require("./routes/books");


mongoose.connect('mongodb://127.0.0.1:27017/Store', { useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=> console.log("connected to mongodb"))
.catch(err => console.error("couldn't to mongodb"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/books",route1);

app.listen(3500,()=>console.log("listening at port 3500"));