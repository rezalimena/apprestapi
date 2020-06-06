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

exports.login= (req,res) => {
    var post = {
        email : req.body.email,
        password : md5(req.body.password)
    }
    var sqlstmt = "SELECT * FROM user WHERE EMAIL = ? AND PASSWORD = ?";
    con.query(sqlstmt,[post.email,post.password],(err,rows,field)=>{
        if(err) throw err
        else 
        if(rows.length== 1)
        {
            var token = jwt.sign({rows},config.secret,{
                expiresIn : 1440
            })
            id_user = rows[0].id

            var data = {
                id_user : id_user,
                access_token : token,
                ip_address :ip.address() 
            }
            sqlstmt = "INSERT INTO akses_token(ID_USER,ACCESS_TOKEN,IP_ADDRESS) VALUES(?,?,?)";

            con.query(sqlstmt,[data.id_user,data.access_token,data.ip_address],(err1,res2)=>{
                if(err1) throw err1
                else{
                    res.json({
                        success : true,
                        message : "token has been generated",
                        token : token,
                        curruser : data.id_user
                    })
                }
            })
        }
        else{
            res.json({
                success : "error",
                message : "Email / password Wrong",                
            })
        }
    })
}

exports.authPage = (req,res)=>{
    response.ok("This Page for Authorized Only Role 2",res);
}



