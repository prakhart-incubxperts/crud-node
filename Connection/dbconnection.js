const { response } = require('express');
const sql = require('mssql')
var Connection = require('tedious').Connection;
var configuration = require('./config');
sql.connect(configuration.config);
var req = new sql.Request();




module.exports.fetchdata = async function () {
  const data = await req.query("select * from PatientDetails")
  console.log("result:", data.recordset)
  return data.recordset;
}



module.exports.change = async function (id, data) {
  console.log("data in change:", data);
  console.log("pid:", id);
  try {
    const fet = await req.query(`UPDATE PatientDetails SET fullname='${data.fullname}',gender='${data.gender}',dob='${data.dob}',refdoc='${data.refdoc}',address='${data.address}',country='${data.country}',state='${data.state}',mobile='${data.mobile}',email='${data.email}',note='${data.note}',image='${data.image}' WHERE pid='${id}';`)
      return fet.rowsAffected;
  } catch (error) {
    return error
  }
}

module.exports.save = function (data) {
  console.log("inside save query func incoming data", data);
  try {
    const res = req.query(`INSERT into PatientDetails values ('${data.pid}','${data.fullname}','${data.gender}','${data.dob}','${data.refdoc}','${data.address}','${data.country}','${data.state}','${data.mobile}','${data.email}','${data.note}','${data.image}')`);
    return res;
  } catch (error) {
    console.log("error in save:",error);
    return error
  }
  
}

module.exports.delete = function (pid) {
  console.log("incoming id", pid);
  try {
    const fet = req.query(`DELETE FROM PatientDetails WHERE pid='${pid}';`).then((res)=>{
      return res.rowsAffected;
    });
    console.log("fet from delete",fet);  
    
  } catch (error) {
    return error;
  }
  
}





