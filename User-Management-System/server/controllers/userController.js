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

// Routes to Add User Page
exports.add = (req, res) => {
    res.render('add-user');
}

// Creates user
exports.create = (req, res) => {

    const { first_name, last_name, email } = req.body; // Destructuring the inputted data to grab from the requested body

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID: ' + connection.threadId);
    
        let sql = 'INSERT INTO users SET usersFN = ?, usersLN = ?, usersEmail = ?'; // sql query
        let escapeQuery = [first_name, last_name, email]; // using escape query to prevent SQL injection Attacks
        

       // Use the connection
        connection.query(sql, escapeQuery, (err, rows) => { // Inserting Data to Database
            // When done with the connection, release it.
            connection.release();

            if(!err){
                res.render('add-user', { alert: 'User Added Successfully!' }); // Displaying an alert message
            } else{
                console.log(err);
            }

            // console.log('The data from user table: \n', rows);
        })

    });
};

// Routes to Edit User Page
exports.edit = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID: ' + connection.threadId);

        let sql = 'SELECT * FROM users WHERE usersId = ?'; // sql query
        let userId = [req.params.id]; // gets the id in the URL

       // Use the connection
        connection.query(sql, userId, (err, rows) => { // Retrives Data from Database
            // When done with the connection, release it.
            connection.release();

            if(!err){
                res.render('edit-user', { rows }); // Passing the data in the object of rows
            } else{
                console.log(err);
            }

            // console.log('The data from user table: \n', rows);
        })

    });
};

// Update User
exports.update = (req, res) => {
    const { first_name, last_name, email } = req.body; // Destructuring the inputted data to grab from the body

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID: ' + connection.threadId);

        let sql = 'UPDATE users SET usersFN = ?, usersLN = ?, usersEmail = ? WHERE usersId = ?'; // sql query
        let userId = req.params.id; // gets the id in the URL
        let escapeQuery = [first_name, last_name, email, userId]; // using escape query to prevent SQL injection Attacks

       // Use the connection
        connection.query(sql, escapeQuery, (err, rows) => { // Updates the data in the Database
            // When done with the connection, release it.
            connection.release();

            if(!err){
                // renders/display the newly updated records
                pool.getConnection((err, connection) => {
                    if(err) throw err; // not connected
                    console.log('Connected as ID: ' + connection.threadId);

                    let sql = 'SELECT * FROM users WHERE usersId = ?'; // sql query
                    let userId = [req.params.id]; // gets the id in the URL

                    // Use the connection
                    connection.query(sql, userId, (err, rows) => { // Retrives Data from Database
                        // When done with the connection, release it.
                        connection.release();

                        if(!err){
                            res.render('edit-user', { rows, alert: 'User Edited Successfully!' }); // Passing the data in the object of rows and displaying alert message
                        } else{
                            console.log(err);
                        }

                        // console.log('The data from user table: \n', rows);
                    })

                });
                
            } else{
                console.log(err);
            }

            // console.log('The data from user table: \n', rows);
        })

    });
};


// Delete User
exports.delete = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID: ' + connection.threadId);

        let sql = 'DELETE FROM users WHERE usersId = ?'; // sql query
        let userId = [req.params.id]; // gets the id in the URL

       // Use the connection
        connection.query(sql, userId, (err, rows) => {
            // When done with the connection, release it.
            connection.release();

            if(!err){
                res.redirect('/'); // Redirect to home page once deleted
            } else{
                console.log(err);
            }

            // console.log('The data from user table: \n', rows);
        })

    });
};


// View/Retrieve User Data
exports.viewUser= (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID: ' + connection.threadId);
        let sql = 'SELECT * FROM users WHERE usersId = ?'; // sql query
        let userId = [req.params.id]; // gets the id in the URL

       // Use the connection
        connection.query(sql, userId, (err, rows) => { // Retrives Data from Database
            // When done with the connection, release it.
            connection.release();

            if(!err){
                res.render('view-user', { rows }); // Passing the data in the object of rows
            } else{
                console.log(err);
            }

            // console.log('The data from user table: \n', rows);
        })

    });
};