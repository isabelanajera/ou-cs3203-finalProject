
const express = require('express');
const app = express();
//const mysql = require('mysql');
const bodyParser = require('body-parser');

let review_info = [
  ["","",""], //hideaway
  ["","",""], //Canes
  ["","",""], //Fuzzy's
  ["","",""], //Pho House
  ["","",""], //Pickleman's
  ["","",""], //Tea Cafe
  ["","",""], //Louies
  ["","",""], //Pink Berry
]

let user_info = [
  ["","",""], //hideaway
  ["","",""], //Canes
  ["","",""], //Fuzzy's
  ["","",""], //Pho House
  ["","",""], //Pickleman's
  ["","",""], //Tea Cafe
  ["","",""], //Louies
  ["","",""], //Pink Berry
]

let users = [];
let currentUser = "";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 


const path = require('path');
const { rmSync } = require('fs');


const PORT = process.env.PORT || 2000

app.use(express.static(__dirname));

const sql = require('mssql');
const { error } = require('console');

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
  res.render("signup", {status : ""})
})

app.post("/signup", async(req, res) => {


  //I THINK we have to alter the structure instead of sending them directly to the first page
  //CHANGE this to QUERY the database to put info
  const email = req.body.name
  const password = req.body.password
  users.push(email)
  currentUser = email
  //res.render("first")
  //res.sendFile(path.join(__dirname, '/projects/first.html'))
    //This is beginning.
    try {
        await sql.connect(config);
        const query = `SELECT * FROM login WHERE  login_id = '${email}'`;
        // Execute the stored procedure
        const result = await sql.query(query);
        if (result.recordset.length > 0) {
            // console.log(currentUser)
            //console.log(input)
            res.render("signup", { status: "Username already taken." })
            //res.sendFile(path.join(__dirname, '/projects/restaurants.html'))
        }
        else {
            //This is his
            users.push(email)
            currentUser = email

            const query2 = `EXEC newUser @username = '${email}', @password = '${password}'`;
            const result2 = await sql.query(query2);
            console.dir(result2);

           // const query2 = 'INSERT INTO login(login_id, password) VALUES(email, password)';
            //const result2 = await sql.query(query2);
            //console.dir(result2)
            //res.sendFile(path.join(__dirname, '/projects/restaurants.html'))
            res.render("first")
        }

    }
    catch (err) {
        console.error('Error executing stored procedure:', err);
        //res.render("signup", {status : "Username Taken"})
        //res.status(500).send('Internal Server Error');
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
        if (result.recordset.length > 0){
   // console.log(currentUser)
    //console.log(input)

    res.render("restaurants", 
    {
      hp1 : review_info[0][0],
      hp2 : review_info[0][1],
      hp3 : review_info[0][2],
      hp11 : user_info[0][0],
      hp12 : user_info[0][1],
      hp13 : user_info[0][2],
      
      
      cp1 : review_info[1][0],
      cp2 : review_info[1][1],
      cp3 : review_info[1][2],
      cp11 : user_info[0][0],
      cp12 : user_info[0][1],
      cp13 : user_info[0][2],
      
      fp1 : review_info[2][0],
      fp2 : review_info[2][1],
      fp3 : review_info[2][2],
      fp11 : user_info[0][0],
      fp12 : user_info[0][1],
      fp13 : user_info[0][2],
  
      pp1 : review_info[3][0],
      pp2 : review_info[3][1],
      pp3 : review_info[3][2],
      pp11 : user_info[0][0],
      pp12 : user_info[0][1],
      pp13 : user_info[0][2],
  
      pip1 : review_info[4][0],
      pip2 : review_info[4][1],
      pip3 : review_info[4][2],
      pip11 : user_info[0][0],
      pip12 : user_info[0][1],
      pip13 : user_info[0][2],
  
      tp1 : review_info[5][0],
      tp2 : review_info[5][1],
      tp3 : review_info[5][2],
      tp11 : user_info[0][0],
      tp12 : user_info[0][1],
      tp13 : user_info[0][2],
  
      lp1 : review_info[6][0],
      lp2 : review_info[6][1],
      lp3 : review_info[6][2],
      lp11 : user_info[0][0],
      lp12 : user_info[0][1],
      lp13 : user_info[0][2],
  
      pinp1 : review_info[7][0],
      pinp2 : review_info[7][1],
      pinp3 : review_info[7][2],
      pinp11 : user_info[0][0],
      pinp12 : user_info[0][1],
      pinp13 : user_info[0][2]
    }
    )    //res.sendFile(path.join(__dirname, '/projects/restaurants.html'))
  }
  else{
    //res.sendFile(path.join(__dirname, '/projects/login.html'))
    res.render("login", {status : "Invalid Credentials"})
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
  res.render("restaurants", 
    {
      hp1 : review_info[0][0],
      hp2 : review_info[0][1],
      hp3 : review_info[0][2],
      hp11 : user_info[0][0],
      hp12 : user_info[0][1],
      hp13 : user_info[0][2],
      
      
      cp1 : review_info[1][0],
      cp2 : review_info[1][1],
      cp3 : review_info[1][2],
      cp11 : user_info[0][0],
      cp12 : user_info[0][1],
      cp13 : user_info[0][2],
      
      fp1 : review_info[2][0],
      fp2 : review_info[2][1],
      fp3 : review_info[2][2],
      fp11 : user_info[0][0],
      fp12 : user_info[0][1],
      fp13 : user_info[0][2],
  
      pp1 : review_info[3][0],
      pp2 : review_info[3][1],
      pp3 : review_info[3][2],
      pp11 : user_info[0][0],
      pp12 : user_info[0][1],
      pp13 : user_info[0][2],
  
      pip1 : review_info[4][0],
      pip2 : review_info[4][1],
      pip3 : review_info[4][2],
      pip11 : user_info[0][0],
      pip12 : user_info[0][1],
      pip13 : user_info[0][2],
  
      tp1 : review_info[5][0],
      tp2 : review_info[5][1],
      tp3 : review_info[5][2],
      tp11 : user_info[0][0],
      tp12 : user_info[0][1],
      tp13 : user_info[0][2],
  
      lp1 : review_info[6][0],
      lp2 : review_info[6][1],
      lp3 : review_info[6][2],
      lp11 : user_info[0][0],
      lp12 : user_info[0][1],
      lp13 : user_info[0][2],
  
      pinp1 : review_info[7][0],
      pinp2 : review_info[7][1],
      pinp3 : review_info[7][2],
      pinp11 : user_info[0][0],
      pinp12 : user_info[0][1],
      pinp13 : user_info[0][2]
    })
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
