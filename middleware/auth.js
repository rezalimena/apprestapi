var con = require('../koneksi');
var mysql = require('mysql');
var md5 = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//controller untuk register
exports.registrasi = (req,res)=>{
    var pos = {
        username: req.body.username,
        email : req.body.email,
        password : md5(req.body.password),
        role : req.body.role,
        tanggal_daftar : new Date()
    }
    var sqlstmt = "SELECT EMAIL FROM user WHERE EMAIL = ?";
    con.query(sqlstmt,[pos.email],(err,rows,field)=>{
        if (err) throw err
        else
        {
            if(rows.length==0)
            {
                sqlstmt = `INSERT INTO user (USERNAME,EMAIL,PASSWORD,ROLE,TANGGAL_DAFTAR)
                VALUES(?,?,?,?,?)`;
                con.query(sqlstmt,[pos.username,pos.email,pos.password,pos.role,pos.tanggal_daftar],(err,res1)=>{
                    if(err) throw err
                    else response.ok("Data Inserted",res);
                })
            }
            else{
                response.ok("Data Already Exist",res)
            }
        }
    })

}



