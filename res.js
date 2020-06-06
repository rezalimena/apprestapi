'use strict';

exports.ok = function(value,res){
    var data = {
        'status' : 200,
        'value' : value
    }
     res.json(data);
     res.end();
}

exports.nestedJSON = function(value,res){
    var config = [{
        nim : '',
        nama :'',
        jurusan : '',
        krs :[{
            matakuliah : '',
            sks : ''
        }]
    }]    

    value.forEach(item => {   
        var index = config.map(function(e) { return e.nama; }).indexOf(item.nama);     
        if (index == -1)
        {
            config.push({
                nama : item.nama,
                nim : item.nim,
                jurusan : item.jurusan,
                krs: [{
                    matakuliah : item.matakuliah,
                    sks : item.sks
                }]
            });                        
        }
        else{            
            config[index].krs.push({
                matakuliah : item.matakuliah,
                sks : item.sks
            })
        }
    });
    config.shift();        
    
    var data = {
        'status' : 200,
        'value' : config
    }
    res.json(data);
    res.end();
}