var mysql = require('mysql');

const con = mysql.createConnection({
    host : "localhost",
    user : "reza",
    password : "kartini67",
    database : "nodeapi"    
})

con.connect((err)=>{
    if(err)throw err
    else console.log("Connection Success");
});

module.exports = con;
