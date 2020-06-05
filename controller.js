'use strict'

var response = require('./res');
var con = require('./koneksi');

exports.index = function(req,res){
    response.ok("Aplication is working");
}
