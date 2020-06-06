'use strict'

module.exports = function(app) {
    var myjson = require('./controller');

    app.route('/').get(myjson.index);
    app.route('/tampil').get(myjson.showData);
    app.route('/tampil/:id').get(myjson.showDataId); 
    app.route('/mahasiswa').post(myjson.addData); 
    app.route('/mahasiswa/:id').put(myjson.editData); 
    app.route('/mahasiswa/delete/:id').delete(myjson.deleteData); 
}
