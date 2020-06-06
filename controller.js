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

exports.editData = (req,res)=> {
    let id = req.params.id
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;
    let sql = "UPDATE mahasiswa SET NIM =?, NAMA=?, JURUSAN=? WHERE ID_MAHASISWA=?";

    con.query(sql,[nim,nama,jurusan,id],(err,res1)=>{
        if(err) throw err;
        else response.ok("Updated Success",res);
    })
}

exports.deleteData = (req,res)=> {
    let id = req.params.id    
    let sql = "DELETE FROM mahasiswa WHERE ID_MAHASISWA = ?";

    con.query(sql,[id],(err,res1)=>{
        if(err) throw err;
        else response.ok("Deleted Success",res);
    })
}


exports.nestedJSON = (req,res)=> {    
    let sql = `SELECT A.nim, A.nama, A.jurusan, B.matakuliah, B.sks 
    FROM mahasiswa A, matakuliah B, krs C WHERE A.id_mahasiswa=C.id_mahasiswa AND B.id_matakuliah=C.id_matakuliah`;

    con.query(sql,(err,rows,field)=> {
        if(err) throw err;
        else
            response.nestedJSON(rows,res);
    });
}
