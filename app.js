const express=require("express");
const bodyParser=require("body-parser");
const fs=require('fs');
const app=express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const dataPath='./data/data.json';
const routes = require('./route');
const accountRoutes = require("./account");
const cors=require("cors")
app.use(cors());
app.use('/', routes)

const getData=()=>{
    const jsondata=fs.readFileSync(dataPath)
    console.log("jsondata",jsondata);
    
    const mainData=Object.values(JSON.parse(jsondata))[0];
    return (mainData) ;
}

const saveData=(data)=>{
    fs.readFile(dataPath,function(err,recvdata){
        var details=[];
         details=JSON.parse(recvdata)
        console.log("recvdata",recvdata)
        details.push(data)
        fs.writeFile(dataPath,JSON.stringify(details))
    })
}

accountRoutes.get('/patient',(req,res)=>{
    const accounts=getData()
    res.send(accounts)
})

accountRoutes.post('/patient/add',(req,res)=>{
    const save=saveData(req.body)
    res.send({success: true, msg: 'patient added successfully'})
})

app.listen(9000,()=>{

    console.log("listening at port:9000")
    
})