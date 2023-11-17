const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config(); // Keeps DB Credentials

const port = process.env.PORT || 5000;

// Parsing Middleware
// Parse application/x-www-form-urlencoded
// Encodes Array and Objects into URL-encoded format
app.use(bodyParser.urlencoded({ extended: false })); // Contain Key-Value Pairs, value can be string or array; when {extended : false}

// Parse application/json
app.use(bodyParser.json());

// Static Files
app.use(express.static('public'));

// Templating Engine
app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs'); // Setting hbs as default template

// Conncetion Pool - to reuse db cache for future request 
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME
});

// Connection to Database
pool.getConnection((err, connection) => {
    if(err) throw err; // not connected

    console.log('Connected as ID: ' + connection.threadId);
});

// Routes
const routes = require('./server/routes/user');
app.use('/', routes);



app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
});