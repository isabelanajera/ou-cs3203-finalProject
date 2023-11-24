
const express = require('express');

const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');


let users = [];
let currentUser = "";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 


const path = require('path');
const { rmSync } = require('fs');


const PORT = process.env.PORT || 3000

//var connection = new ActiveXObject("ADODB.Connection");

app.use(express.static(__dirname));


const sql = require('mssql');

const config = {
    user: 'prid0006', // better stored in an app setting such as process.env.DB_USER
    password: 'LBarnes01', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'prid0006.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'cs-dsa-4513-sql-db', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}


//where we expose files or directories for public use
app.use(',', express.static(path.join(__dirname, '/public')));

//where we set our routes
/*app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

  <script>src = "/Users/harivansh/Documents/School/CS3203/testweb/routes/login.js" </script>


//Use a static file /css
app.use(express.static(__dirname));

//This is what happens when the client runs get
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  //res.send("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>");
});

//since our html form is post this is what happens on post
app.post("/", (req, res) => {
  res.send("Thank you for subscribing");
});
*/

//The port the app will listen on
const server = app.listen(PORT, () => console.log(`server running on port ${PORT}`))

app.get("/signup", (req, res) => {
  //res.sendFile(path.join(__dirname, '/projects/signup.html'))
  res.render("signup")
})

app.post("/signup", async(req, res) => {
  //CHANGE this to QUERY the database to put info
  const email = req.body.name
  const password = req.body.password
  users.push(email)
  currentUser = email
  res.render("first")
  //res.sendFile(path.join(__dirname, '/projects/first.html'))
    //This is beginning.
    try {
        await sql.connect(config);
        const query = `INSERT INTO login VALUES newUser @username = '${email}', @password = '${password}'`;

        // Execute the stored procedure
        const result = await sql.query(query);
        //This is his
        users.push(email)
        currentUser = email
        res.sendFile(path.join(__dirname, '/projects/restaurants.html'))
    }
    catch (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        // Close the database connection
        await sql.close();
    }
});
//New end, sort of
//})
app.post("/login", async(req, res) => {

  //CHANGE this to QUERY the database for the info
    const input = req.body.email
    const password = req.body.password
    try {
        await sql.connect(config);
        const result = await sql.query(
            `SELECT * FROM login WHERE login_id = '${input}' AND password = '${password}'`);
        if (users.includes(input) && result.recordset.length > 0){
    console.log(currentUser)
    console.log(input)
      res.render("restaurants")
    //res.sendFile(path.join(__dirname, '/projects/restaurants.html'))
  }
  else{
    //res.sendFile(path.join(__dirname, '/projects/login.html'))
    res.render("login", {status : "Incorrect Credentials"})
    //res.send(fun)

    //res.status(400).send("USER NOT FOUND")

    //window.onload()
        }
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        await sql.close();
    }
});

app.get("/login", (req, res) => {
  //res.sendFile(path.join(__dirname, '/projects/login.html'))
  res.render("login", {status : ""})
    //res.send("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>");
});


app.post("/restaurants", (req, res) => {
  //ADD QUERY for posting a review



})
app.get("/restaurants", (req, res) => {
  res.render("restaurants")
  //res.sendFile(path.join(__dirname, '/projects/restaurants.html'))
    //res.send("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>");
});

app.get("/", (req, res) => {
  res.render("first")
  //res.sendFile(path.join(__dirname, '/projects/first.html'))
});

function closeServer() {
  server.close((err) => {
    if (err) {
      console.error('Error closing the server:', err);
    } else {
      console.log('Server closed successfully.');
    }
  });
} 

module.exports = { app, server, closeServer } ;

//test whether github workflow works 1
/*
<script>
const form = document.getElementById('form');
const email = document.getElementById("yourem")
const password = document.getElementById("pass")
\
form.addEventListener('submit', function(e) {
e.preventDefault();

const first = email.value;
const second = password.value

console.log(first)
console.log(second)


})
</script>
*/

function fun() {  
  alert(location.hostname);  
} 
