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
    const mainData=Object.values(JSON.parse(jsondata));
    console.log("jsondata",(JSON.parse(jsondata)));
    console.log("maindata",mainData);
    return (mainData) ;
}

const saveData=(data)=>{
    // const file=fs.readFileSync(dataPath);
    // const allData=Object.values(JSON.parse(file))[0]
    // console.log('allData=',allData);
    // console.log("data:",data);

    fs.readFile(dataPath,function(err,recvdata){
        
         const details=Object.values(JSON.parse(recvdata))
        console.log("details",details)
        details.push(data)
        fs.writeFileSync(dataPath,JSON.stringify(details))
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

accountRoutes.put('/patient/:id',(req,res)=>{
    var index=0;
    fs.readFile(dataPath,function(err,recvdata){
        const existingData=Object.values(JSON.parse(recvdata))
        console.log("existingdata=",existingData);
        
    existingData.findIndex(function(entry,number){
        console.log('entry.pid=',entry.pid, 'req.body.pid=',req.body.pid);
        if(entry.pid==(req.body.pid)){
            index=number;
            return true;
        }
    })
    console.log("index=",index);
    var editedData=existingData.splice(index,1);
    console.log("existingdata after splice=",existingData);
    existingData.push(req.body);
    console.log("existingdata after push=",existingData);
    fs.writeFileSync(dataPath,JSON.stringify(existingData))
    console.log("req.body",req.body);
    })

    res.send({success: true, msg: 'patient edited successfully'})
})

accountRoutes.delete('/patient/delete/:id',(req,res)=>{
    var index=0;
    console.log("req",req.params.id);
    

    fs.readFile(dataPath,function(err,recvdata){
        const existingData=Object.values(JSON.parse(recvdata))
        console.log("existingdata=",existingData);
    existingData.findIndex(function(entry,number){
        console.log('entry.pid=',entry.pid, 'req.param.id=',req.params.id);
        if(entry.pid==(req.params.id)){
            index=number;
            return true;
        }
    })
    console.log("index=",index);
    var editedData=existingData.splice(index,1);
    console.log("existingdata after splice=",existingData);
    fs.writeFileSync(dataPath,JSON.stringify(existingData))
    console.log("req.body",req.body.data);
    })
    res.send({success: true, msg: 'patient data deleted successfully'})
})

app.listen(9000,()=>{

    console.log("listening at port:9000")
    
})