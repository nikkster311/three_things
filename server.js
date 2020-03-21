const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //will help connect to mongodb database

require('dotenv').config();  // so we can have env vars in the dotenv file

const app = express();  // how we'll create our express server
const port = process.env.PORT || 5000;

app.use(cors());  //cors middleware
app.use(express.json());  //allows us to parse json

app.get('/', (req, res) => res.send('Hello World!'))

const uri = process.env.ATLAS_URI; //get uri from mongodb atlas dashboard
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
// above passes uri to start connection to mongodb server
const connection = mongoose.connection;
connection.once('open', () => { //once connection is open, will log phrase below
  console.log("MongoDB database connection est successfully");
})


const entriesRouter = require("./routes/entries"); //imports
const usersRouter = require('./routes/users');

app.use('/entries', entriesRouter); //uses imported files
app.use('/users', usersRouter);




app.listen(port, () => {  //this starts the server, server starts listening on a certian port
  console.log(`server is running on port: ${port}`);
});
