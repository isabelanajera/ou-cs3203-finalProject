
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
let restaurants = ["Hideaway", "Canes", "Fuzzys", "Pho House", "Picklemans", "Tea Cafe", "Louies", "Pink Berry"];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 


const path = require('path');
const { rmSync } = require('fs');


const PORT = process.env.PORT || 2000

app.use(express.static(__dirname));

const sql = require('mssql');
const { error } = require('console');
const { exit } = require('process');

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
            //res.sendFile(path.join(__dirname, '/projects/restaurants.html'))
            res.render("first", {status : " "})
        }

    }
    catch (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        // Close the database connection
        await sql.close();
    }
});

app.post("/login", async (req, res) => {

    //CHANGE this to QUERY the database for the info
    const input = req.body.email
    const password = req.body.password
try {
        await sql.connect(config);
        const result = await sql.query(
            `SELECT * FROM login WHERE login_id = '${input}' AND password = '${password}'`);
        if (result.recordset.length > 0) {
            for (let i = 0; i < restaurants.length; i++) {
                const result2 = await sql.query(`SELECT review FROM reviews WHERE rname = '${restaurants[i]}'`);
                const result3 = await sql.query(`SELECT login_id FROM reviews WHERE rname = '${restaurants[i]}'`);
                if (result2.recordset.length > 0 && result3.recordset.length > 0) {
                    console.log(result2.recordset.length, result3.recordset.length)
                    for (let j = 0; j < result2.recordset.length; j++) {
                        review_info[i][j] = JSON.stringify(result2.recordset.at(j)).split(":").at(1).replace("}", '');
                        user_info[i][j] = JSON.stringify(result3.recordset.at(j)).split(":").at(1).replace("}", '').replaceAll('"', '');
                        console.log(review_info[i][j], user_info[i][j]);
                    }
                }
            }
        
        res.render("restaurants",
            {
                hp1: review_info[0][0],
                hp2: review_info[0][1],
                hp3: review_info[0][2],
                hp11: user_info[0][0],
                hp12: user_info[0][1],
                hp13: user_info[0][2],


                cp1: review_info[1][0],
                cp2: review_info[1][1],
                cp3: review_info[1][2],
                cp11: user_info[1][0],
                cp12: user_info[1][1],
                cp13: user_info[1][2],

                fp1: review_info[2][0],
                fp2: review_info[2][1],
                fp3: review_info[2][2],
                fp11: user_info[2][0],
                fp12: user_info[2][1],
                fp13: user_info[2][2],

                pp1: review_info[3][0],
                pp2: review_info[3][1],
                pp3: review_info[3][2],
                pp11: user_info[3][0],
                pp12: user_info[3][1],
                pp13: user_info[3][2],

                pip1: review_info[4][0],
                pip2: review_info[4][1],
                pip3: review_info[4][2],
                pip11: user_info[4][0],
                pip12: user_info[4][1],
                pip13: user_info[4][2],

                tp1: review_info[5][0],
                tp2: review_info[5][1],
                tp3: review_info[5][2],
                tp11: user_info[5][0],
                tp12: user_info[5][1],
                tp13: user_info[5][2],

                lp1: review_info[6][0],
                lp2: review_info[6][1],
                lp3: review_info[6][2],
                lp11: user_info[6][0],
                lp12: user_info[6][1],
                lp13: user_info[6][2],

                pinp1: review_info[7][0],
                pinp2: review_info[7][1],
                pinp3: review_info[7][2],
                pinp11: user_info[7][0],
                pinp12: user_info[7][1],
                pinp13: user_info[7][2]
            }
        )   //res.sendFile(path.join(__dirname, '/projects/restaurants.html'))
    }
        else {
            res.render("login", { status: "Invalid Credentials" })
        }
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        await sql.close();
    }
});

app.get("/login", (req, res) => {
  res.render("login", {status : ""})
});

app.post("/restaurants", async(req, res) => {
    //ADD QUERY for posting a review
    console.log(currentUser)
    if (currentUser == "") {
        res.render("first", { status: "Login or create an account to leave a review." })
       // exit;
    }
    else {
        let input = req.body.email
        const restaurant1 = req.body.restaurant
        try {
            await sql.connect(config);
            console.log(currentUser)
            const result = await sql.query(
                `EXEC insertReview @review = '${input}', @restaurant = '${restaurant1}', @user_name = '${currentUser}'`);
            res.render("first", {status : " "})
        } catch (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).send('Internal Server Error');
        } finally {
            await sql.close();
        }
    }
});
app.get("/restaurants", async (req, res) => {
    try {
        await sql.connect(config);
        for (let i = 0; i < restaurants.length; i++) {
            const result2 = await sql.query(`SELECT review FROM reviews WHERE rname = '${restaurants[i]}'`);
            const result3 = await sql.query(`SELECT login_id FROM reviews WHERE rname = '${restaurants[i]}'`);
            if (result2.recordset.length > 0 && result3.recordset.length > 0) {
                for (let j = 0; j < result2.recordset.length; j++) {
                    review_info[i][j] = JSON.stringify(result2.recordset.at(j)).split(":").at(1).replace("}", '');
                    user_info[i][j] = JSON.stringify(result3.recordset.at(j)).split(":").at(1).replace("}", '').replaceAll('"', '');
                }
            }
        } 
  res.render("restaurants",
        {
            hp1: review_info[0][0],
            hp2: review_info[0][1],
            hp3: review_info[0][2],
            hp11: user_info[0][0],
            hp12: user_info[0][1],
            hp13: user_info[0][2],

            cp1: review_info[1][0],
            cp2: review_info[1][1],
            cp3: review_info[1][2],
            cp11: user_info[1][0],
            cp12: user_info[1][1],
            cp13: user_info[1][2],

            fp1: review_info[2][0],
            fp2: review_info[2][1],
            fp3: review_info[2][2],
            fp11: user_info[2][0],
            fp12: user_info[2][1],
            fp13: user_info[2][2],

            pp1: review_info[3][0],
            pp2: review_info[3][1],
            pp3: review_info[3][2],
            pp11: user_info[3][0],
            pp12: user_info[3][1],
            pp13: user_info[3][2],

            pip1: review_info[4][0],
            pip2: review_info[4][1],
            pip3: review_info[4][2],
            pip11: user_info[4][0],
            pip12: user_info[4][1],
            pip13: user_info[4][2],

            tp1: review_info[5][0],
            tp2: review_info[5][1],
            tp3: review_info[5][2],
            tp11: user_info[5][0],
            tp12: user_info[5][1],
            tp13: user_info[5][2],

            lp1: review_info[6][0],
            lp2: review_info[6][1],
            lp3: review_info[6][2],
            lp11: user_info[6][0],
            lp12: user_info[6][1],
            lp13: user_info[6][2],

            pinp1: review_info[7][0],
            pinp2: review_info[7][1],
            pinp3: review_info[7][2],
            pinp11: user_info[7][0],
            pinp12: user_info[7][1],
            pinp13: user_info[7][2]
        })
}catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        await sql.close();
    }
});


app.get("/", (req, res) => {
    res.render("first", {status : " "})
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

module.exports = { app, server, closeServer };

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
