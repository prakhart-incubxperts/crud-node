const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors")
app.use(cors());
const MainRoutes=require('./Routes/route')();



try {
    app.use(MainRoutes);
} catch (error) {
    console.log("error on first",error);

}

app.listen(9000, () => {

    console.log("listening at port:9000")

})