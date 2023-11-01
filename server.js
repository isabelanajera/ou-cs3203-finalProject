const express = require('express');
const app = express();
//const path = require(c:/demo/proj/src/utils/utils.js);

//const PORT = process.env.PORT || 3000
//where we expose files or directories for public use
//app.use(',', express.static(path.join(__dirname, '/public')));

//where we set our routes
/*app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
*/


//Use a static file /css
//app.use(express.static(__dirname));

//The port the app will listen on
app.listen(3000, () => console.log(`server running on port 3000`))

//This is what happens when the client runs get
app.get("/", (req, res) => {
  //res.sendFile(__dirname + "/index.html");
  res.send("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>");
});

//since our html form is post this is what happens on post
app.post("/", (req, res) => {
  res.send("Thank you for subscribing");
});