const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'Emplyee' // Assuming 'Employee' is the correct database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware for parsing application/json
app.use(bodyParser.json());

// Route for serving the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route for handling form submission
app.post('/submit', (req, res) => {
  const { firstname, secondname, id, department, dob, gender, designation, salary } = req.body;

  // Log the input values
  console.log('Received form data:');
  console.log('First Name:', firstname);
  console.log('Second Name:', secondname);
  console.log('ID:', id);
  console.log('Department:', department);
  console.log('Date of Birth:', dob);
  console.log('Gender:', gender);
  console.log('Designation:', designation);
  console.log('Salary:', salary);

  // Insert form data into the database
  connection.query('INSERT INTO Employees (firstname, secondname, id, department, dob, gender, designation, salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [firstname, secondname, id, department, dob, gender, designation, salary], (err, results) => {
    if (err) {
      console.error('Error inserting data into MySQL: ' + err.stack);
      return res.status(500).send('Error inserting data into MySQL');
    }
    console.log('Data inserted into MySQL with ID: ' + results.insertId);
    res.status(200).send('Data inserted successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}` );
}); 