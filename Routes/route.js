const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const app = express();
const routes = express.Router()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
//const dataPath='../data/data.json';
const cors = require("cors")
app.use(cors());
var Utils = require("../Controller/controller");
const sql=require('mssql');
//const config=require('../Connection/config');
const config = {
    user: 'root',
    password: 'root',
    server: 'PRAKHART',
    database: 'testdb',
    options: {
      encrypt: false, 
    },
  };

module.exports=function (){
    routes.get('/patient', async(req, res) => {
        
        const accounts =await Utils.getData();
        console.log("accounts:",accounts);
        console.log(accounts);
        res.send(accounts);
        
    })

    routes.post('/patient/add', (req, res) => {
        const save = Utils.saveData(req.body);
        res.send({ success: true, msg: 'patient added successfully' },"saveres:",save)
    })

    routes.put('/patient/:id', (req, res) => {
        console.log("pid from edit:",req.body.pid);
        const edit=Utils.editData(req.body.pid,req.body);
        res.send({ success: true, msg: 'patient edited successfully' },"editres:",edit)
    })
    
    routes.delete('/patient/delete/:id', (req, res) => {
        
        console.log("from delete req.param.id", req.params.id);
        const del=Utils.deleteData(req.params.id);
        res.send({ success: true, msg: 'patient data deleted successfully' },"delRes:",del)
    })

    return routes;
}
