const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var morgan = require('morgan');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

var routes = require('./routes');
routes(app);

app.use('/auth',require('./middleware'));

const port = process.env.port || 3000;
 app.listen(port, () => {
     console.log(`Server started on port`,port);
 });