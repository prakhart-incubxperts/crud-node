const sql = require('mssql')
var Connection=require('tedious').Connection;
const config = {
    server: 'PRAKHART',
    database: 'testdb',
    port:1433,
    options: {
      encrypt: false,
      connectionString:"testdb;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False" 
    },
  };

// const sqlConfig = {
//     connectionString:"(localdb)/MSSQLLocalDB;Initial Catalog=master;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False",
//   options: {
//     trustServerCertificate: true // change to true for local dev / self-signed certs
    
//   }
// }
// Data Source=(localdb)/MSSQLLocalDB;Initial Catalog=master;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False
var connection=new Connection(config);
cnt();
async function cnt(){
 
  // make sure that any items are correctly URL encoded in the connection string
  await connection.on('connect',function(err){
    if(err){
        console.log('con err:',err);
    }
    else{
        console.log("connected");
    }
  })
  //const result = await sql.query('select * from PatientDetails');
  connection.connect();
}