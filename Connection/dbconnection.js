const { response } = require('express');
const sql = require('mssql')
var Connection=require('tedious').Connection;

var config ={
  user: 'root',
  password: 'root',
  server: 'PRAKHART',
  database: 'testdb',
  options: {
    encrypt: false, 
  },
}; 
sql.connect(config);





module.exports.fetchdata= async function(){
  var con= new sql.Request();
 const data=await con.query("select * from PatientDetails") 
        console.log("result:",data.recordset)
        return data.recordset;
}


module.exports.change= async function(id,data){
    console.log("data in change:",data);
    console.log("pid:",id);
    var req=new sql.Request();
      const fet= await req.query(`UPDATE PatientDetails SET fullname='${data.fullname}',gender='${data.gender}',dob='${data.dob}',refdoc='${data.refdoc}',address='${data.address}',country='${data.country}',state='${data.state}',mobile='${data.mobile}',email='${data.email}',note='${data.note}',image='${data.image}' WHERE pid='${id}';`)
      console.log("in change fet:",fet);
  
}

module.exports.save=function(data){
  console.log("incoming data",data); 
    var req=new sql.Request();
      const fet=req.query(`INSERT into PatientDetails values ('${data.pid}','${data.fullname}','${data.gender}','${data.dob}','${data.refdoc}','${data.address}','${data.country}','${data.state}','${data.mobile}','${data.email}','${data.note}','${data.image}')`);
    console.log("fet:",fet);
  
}

module.exports.delete=function(pid){
  console.log("incoming id",pid); 
    var req=new sql.Request();
      const fet=req.query(`DELETE FROM PatientDetails WHERE pid='${pid}';`);
    console.log("fet:",fet);
  
}




  
