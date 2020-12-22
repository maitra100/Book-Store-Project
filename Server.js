const express=require('express');
const mongoose=require("mongoose");
const app=express();
const bodyParser=require("body-parser");
const route1=require("./routes/books");
const route2=require("./routes/genres");
const route3=require("./routes/users");
const route4=require("./routes/auth");


mongoose.connect('mongodb://127.0.0.1:27017/Store', { useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=> console.log("connected to mongodb"))
.catch(err => console.error("couldn't to mongodb"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/books",route1);
app.use("/api/genre",route2);
app.use("/api/users",route3);
app.use("/api/auth",route4);

app.listen(3500,()=>console.log("listening at port 3500"));
