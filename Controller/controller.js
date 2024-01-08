const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const dataPath ='./data/data.json';
const sql=require('mssql');
const config=require('../Connection/config');
var dbutils=require('../Connection/dbconnection');
const cors = require("cors")
app.use(cors());





    module.exports.getData= async function(){

        console.log("inside getdata");
        try {
             const data=await dbutils.fetchdata()
            console.log("inside getdata after fetch data:",data);
            return data
 
        } catch (error) {
            console.log("error in fetch:",error);
        }
        
        
        
        // const jsondata = fs.readFileSync(dataPath)
        // const mainData = Object.values(JSON.parse(jsondata));
        // //console.log("jsondata", (JSON.parse(jsondata)));
        // console.log("maindata", mainData);
       
    }
    
     module.exports.saveData=function(data){

        const rec=dbutils.save(data);
        // fs.readFile(dataPath, function (err, recvdata) {
    
        //     const details = Object.values(JSON.parse(recvdata))
        //     console.log("details", details)
        //     details.push(data)
        //     fs.writeFileSync(dataPath, JSON.stringify(details))
        // })
    }

    module.exports.editData=function(id,data){
        console.log("cntrl edit id:",id);
        console.log("data",data);
        const rec=dbutils.change(id,data);
        return true;
    }

    module.exports.deleteData=function(pid){
        console.log("incoming delete pid:",pid);
        const rec=dbutils.delete(pid);
        // var index = 0;
        // console.log("id",pid);
        // fs.readFile(dataPath, function (err, recvdata) {
        //     console.log("inside delete fs");
        //     const existingData = Object.values(JSON.parse(recvdata))
        //     console.log("existingdata=", existingData);
        //     existingData.findIndex(function (entry, number) {
        //         console.log('entry.pid=', entry.pid, 'req.param.id=', pid);
        //         if (entry.pid == (pid)) {
        //             index = number;
        //             return true;
        //         }
        //     })
        //     console.log("index=", index);
        //     var editedData = existingData.splice(index, 1);
        //     console.log("existingdata after splice=", existingData);
        //     fs.writeFileSync(dataPath, JSON.stringify(existingData))
        //     console.log("req.body", req.body.data);
        // })
            return true;
    }



    


 

