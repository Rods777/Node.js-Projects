// Quering From the database

const mysql = require('mysql');

// Conncetion Pool - to reuse db cache for future request 
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME
});


// View/Retrieve Users
exports.view = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID: ' + connection.threadId);
        let sql = 'SELECT * FROM users'; // sql query

       // Use the connection
        connection.query(sql, (err, rows) => { // Retrives Data from Database
            // When done with the connection, release it.
            connection.release();

            if(!err){
                res.render('home', { rows }); // Passing the data in the object of rows
            } else{
                console.log(err);
            }

            // console.log('The data from user table: \n', rows);
        })

    });
};


// Search/Find Users
exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID: ' + connection.threadId);
    
        let searchInput = req.body.search; // Handles the search HTML input (name="search") form with medthod = post
        let sql = 'SELECT * FROM users WHERE usersId = ? OR usersFN LIKE ? OR usersLN LIKE ? OR usersEmail LIKE ?';
        let escapeQuery = [searchInput, '%' + searchInput + '%', '%' + searchInput + '%', '%' + searchInput + '%']; // using escape query to prevent SQL injection Attacks
        

       // Use the connection
        connection.query(sql, escapeQuery, (err, rows) => { // Retrives Data from Database
            // When done with the connection, release it.
            connection.release();

            if(!err){
                res.render('home', { rows }); // Passing the data in the object of rows
            } else{
                console.log(err);
            }

            // console.log('The data from user table: \n', rows);
        })

    });
};