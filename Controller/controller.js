const express = require("express");
const app = express();
var dbutils = require('../Connection/dbconnection');






module.exports.getData = async function () {
    console.log("inside getdata");
    try {
        const data = await dbutils.fetchdata()
        console.log("inside getdata after fetch data:", data);
        return data
    } catch (error) {
        console.log("error in fetch:", error);
    }
}

module.exports.saveData = function (data) {
    const savedResponse = dbutils.save(data);
    console.log("savedResponse", savedResponse);
}

module.exports.editData = function (id, data) {
    console.log("edit id:", id);
    console.log("data", data);
    const editResponse = dbutils.change(id, data);
    console.log("editResponse", editResponse);
    return true;
}

module.exports.deleteData = function (pid) {
    console.log("incoming delete pid:", pid);
    const deleteResponse = dbutils.delete(pid);
    console.log("deleteResponse", deleteResponse);
    return true;
}








