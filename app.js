const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const app = express();
const newroutes = express.Router()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const dataPath = './data/data.json';
// const routes = require('./route');
// const accountRoutes = require("./account");
var Utils = require("./Controller/controller");
const cors = require("cors")
app.use(cors());
// app.use('/', newroutes)
const MainRoutes=require('./Routes/route')();


app.use(MainRoutes);


app.listen(9000, () => {

    console.log("listening at port:9000")

})