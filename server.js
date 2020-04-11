const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //will help connect to mongodb database
const path = require('path');

require('dotenv').config();  // so we can have env vars in the dotenv file

const app = express();  // how we'll create our express server
// const port = process.env.PORT || 5000; //this number is for local development

// above from FCC tutorial, below for heroku deployment

app.set('port', (process.env.PORT || 5000));

app.use(cors());  //cors middleware
app.use(express.json());  //allows us to parse json

// app.get('/', (req, res) => res.send('root route'))

const uri = process.env.MONGODB_URI; //get uri from mongodb atlas dashboard
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
.then(() => console.log('database connected!!'))
.catch(err => console.log("error at mongoose connection, " + err));
// above passes uri to start connection to mongodb server
const connection = mongoose.connection;
connection.once('open', () => { //once connection is open, will log phrase below
  console.log("MongoDB database connection est successfully");
})

const entriesRouter = require("./routes/entries"); //imports
const usersRouter = require('./routes/users');

app.use('/entries', entriesRouter); //uses imported files
app.use('/users', usersRouter);




// BELOW FROM YOUTUBE

// if (process.env.NODE_ENV === 'production') { //this is how we know app is on heroku
//   app.use(express.static('../client/build')) //get this after 'npm run build'
// }



//BELOW FROM FCC

// first you need to use the inbuilt path module in node and declare the static
// folder you would like to use in this Express server.
//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));


//if in production, serve index.html from BUILD, not PUBLIC
//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
    })}

//if NOT in prod, if testing and running on localhost, run from PUBLIC folder
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'client/public/index.html'));})






app.listen(app.get('port'), function() {
  console.log('node app is running on port', app.get('port'))
});

//above for heroku deployment
// below from FCC tutorial

// app.listen(port, (req, res) => {  //this starts the server, server starts listening on a certian port
//   console.log(`server is running on port: ${port}`);
// });
