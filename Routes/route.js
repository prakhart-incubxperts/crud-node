const express = require("express");
const app = express();
const routes = express.Router();
const cors = require("cors")
app.use(cors());
var Utils = require("../Controller/controller");




module.exports=function (){
    routes.get('/patient', async(req, res) => {
        
        const accounts =await Utils.getData();
        console.log("accounts:",accounts);
        res.send(accounts);
        
    })

    routes.post('/patient/add', (req, res) => {
        console.log("inside post ");
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
