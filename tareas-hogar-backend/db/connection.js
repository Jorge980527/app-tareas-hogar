const mysql = require('mysql2'); // Cambia de mysql a mysql2

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '980527',
  database: 'task_manager'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;
