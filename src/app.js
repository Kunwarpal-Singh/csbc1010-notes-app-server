const config = require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mysql = require('mysql')

const healthRouter = require("./routes/health")
const notesRouter = require("./routes/notes")
const noteRouter = require("./routes/note")

if (config.error) {
  throw config.error
}

const port = process.env.PORT // || 3001
global.port = port

const corsOptions ={
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
  TODO-1: Settup Database connection
*/
const bodyParser = require('body-parser');
const db = mysql.createConnection ({
  host: 'localhost',
  user: 'kps134',
  password: 'nitro7kps',
  database: 'Notes_App'
});

db.connect((err) => {
  if (err) {
      throw err;
  }

  var table = `CREATE TABLE IF NOT EXISTS note_details2 (
    id int(5) NOT NULL AUTO_INCREMENT,
    text varchar(255),
    dateCreated datetime DEFAULT current_timestamp,
    lastModified datetime DEFAULT current_timestamp on update current_timestamp,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1`;

  db.query(table, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

  console.log('Connected to database');
});
global.db = db;



// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client

/*
  TODO-2: Upon database connection success, create the relavent table(s) if it does not exist.
*/

app.get('/', (req, res) => {
  res.send('CSBC1010 Assignment 3 - My Notes')
})

app.use("/health", healthRouter)
app.use("/notes", notesRouter)
app.use("/note", noteRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

module.exports = db