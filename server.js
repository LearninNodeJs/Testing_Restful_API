let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 3000;
let Book = require('./api/model/Book');
let config = require('config');

let options = {
    server:{
        socketOptions:{
            keepAlive:1,
            connectTimeoutMS: 30000
        }
    },
    replSet:{
        socketOptions:{
            keepAlive:1,
            connectTimeoutMS: 30000
        }
    },
    useNewUrlParser:true
};
mongoose.connect(config.DBHOST,options);
let database = mongoose.connection;
database.on('error',console.error.bind(console,'Connection Error'));

if(config.util.getEnv('NODE_ENV')==='test'){
    app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get("/", (req, res) => res.json({message: "Welcome to our Bookstore!"}));

app.listen(port);
console.log('Listening on Port' + port);


module.exports = app;