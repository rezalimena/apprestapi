const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.port || 3000;
 app.listen(port, () => {
     console.log(`Server started on port`,port);
 });