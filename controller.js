'use strict'

var response = require('./res');
var con = require('./koneksi');


exports.index = (req,res)=>{
    response.ok("Aplication is working",res);
}

exports.showData = (req,res) => {
    con.query("SELECT * FROM MAHASISWA",(err,rows,field)=> {
        if(err) throw err;
        else
            response.ok(rows,res);
    });

}

exports.showDataId = (req,res) =>{
    let id = req.params.id;
    con.query("SELECT * FROM MAHASISWA WHERE ID_MAHASISWA = ?",[id], (err,rows,field)=>{
        if(err) throw err;
        else
            response.ok(rows,res);
    })
}

exports.addData = (req,res)=> {
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;
    let sql = "INSERT INTO mahasiswa(NIM, NAMA, JURUSAN) VALUES(?,?,?)";

    con.query(sql,[nim,nama,jurusan],(err,res1)=> {
        if(err) throw err;
        else response.ok("Inserted Success",res);
    })
    

}
