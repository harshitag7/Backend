import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

const app = express();

//to use __dirname
import {dirname} from 'path'
import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//connect to our mongoDB databse 
mongoose.connect("mongodb://localhost:27017", {
    dbName : "users"
})
.then(()=>{console.log('connected to mongDB')})
.catch((e) => {console.log(e)});

//defining our schema for collection
const studentSchema = new mongoose.Schema({
    name : String,
    age : Number
});

//creating a collection --> student
const student = mongoose.model("student", studentSchema);


app.use(express.static(path.join(path.resolve(), "public")));
//hepls in excessing http request data
app.use(express.urlencoded({extends: true})); 


//APIS

app.get("/form", (req, res)=>{
    res.sendFile(__dirname+'/public/form.html');
});

app.post("/form", (req, res)=>{
    student.create(req.body);
    res.redirect('/form')
});




app.listen(5000,()=>{
    console.log(100);
})