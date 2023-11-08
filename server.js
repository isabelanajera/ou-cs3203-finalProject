
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

let users = [];
let currentUser = "";

app.use(bodyParser.urlencoded({ extended: true })); 

/*
var con = mysql.createConnection({
  host: "prid0006.database.windows.net",
  dbname: "cs-dsa-4513-sql-db",
  user: "prid0006",
  password: "LBarnes01"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
});
*/

const path = require('path');


const PORT = process.env.PORT || 3000

const intialRoute = require("./routes/initial")
const loginRoute = require("./routes/login")

//var connection = new ActiveXObject("ADODB.Connection");

app.use(express.static(__dirname));
app.use("/initial", intialRoute)
//app.use("/login", loginRoute)

/*
const sql = require('mssql');

const config = {
    user: 'prid0006', // better stored in an app setting such as process.env.DB_USER
    password: 'LBarnes01', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'rid0006.database.windows.ne', // better stored in an app setting such as process.env.DB_SERVER
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
app.listen(PORT, () => console.log(`server running on port ${PORT}`))

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, '/projects/index.html'))
})

app.post("/index", (req, res) => {
  const email = req.body.name
  const password = req.body.password
  users.push(email)
  currentUser = email
  res.sendFile(path.join(__dirname, '/projects/first.html'))

})
app.post("/login", (req, res) => {
  const input = req.body.email
  if(users.includes(input)){
    console.log(currentUser)
    console.log(input)

    res.sendFile(path.join(__dirname, '/projects/restaurants.html'))
  }
  else{
    res.sendFile(path.join(__dirname, '/projects/login.html'))
  }
  });
  app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '/projects/login.html'))
    //res.send("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>");
  });

app.post("/restaurants", (req, res) => {

})

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/projects/first.html'))
});

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
