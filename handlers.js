const Knex = require("knex");
const knexOptions = require("./knexFile");
const knex = Knex(knexOptions);
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//users handlers
function getUser(req,res){
    knex
    .select()
    .table('users')
    .then((data)=>{
        res.json(data)
    })
}



function addUser(req,res){
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    var values = {
        userFirstName: req.body.userFirstname,
        userLastName: req.body.userLastname,
        username: req.body.username,
        password: hashedPassword,
        email : req.body.email,
        phonenumber: req.body.phonenumber,
        youraddress: req.body.youraddress

    };
    knex('users')
    .insert(values)
    .then(
        ()=>{
            res.end("User has been registered!")
        }
    )
}

//event handler
function getEvent(req,res){
    knex
    .select()
    .where('userid',req.params.userid)
    .table('events')
    .then((data)=>{
        res.json(data)
    })
}

function getOneEvent(req,res){
    knex
    .select()
    .where('id',req.params.id)
    .table('events')
    .then((data)=>{
        res.json(data)
    })
}

function deleteEvent(req,res){
    knex('events')
    .delete()
    .where('id',req.params.eventid)
    .then(()=>{
        res.end('Event deleted')
    })
}

function addEvent(req,res){
    var values = {
        eventName: req.body.eventName,
        eventType: req.body.eventType,
        peopleNumber: req.body.peopleNumber,
        venue: req.body.venue,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        userid : req.body.userid
    };
    knex('events')
    .insert(values)
    .then(
        ()=>{
            res.end("Events has been planned!")
        }
    )
}


// create a auth handler
function authUser(request, response) {
    const username = request.body.username;
    const passwordFromJSON = request.body.password;
  
    knex
      .table('users')
      .first('password','id')
      .where('username', username)
      .then(data => {
        if (!data) {
          response.json({
            status: 'fail',
            message: 'User not found.'
          })
        } else {
          const password = data.password;
          const isMatch = bcrypt.compareSync(passwordFromJSON, password);
          if (isMatch) {
            // password matched
            response.json({
              status: 'success',
              userid : data.id,
              username : username,
              accessToken: jwt.sign({
                username: username,
                userid : data.id
              }, 'secret_key')
            })
          } else {
            response.json({
              status: 'fail',
              message: 'Invalid login details'
            })
          }
        }
        
      })
      .catch(error => {
        response.json({
          status: 'fail',
          message: error
        })
      })
}


module.exports = {
    getUser : getUser,
    addUser : addUser,
    getEvent : getEvent,
    addEvent : addEvent,
    authUser:authUser,
    getOneEvent:getOneEvent,
    deleteEvent:deleteEvent
   
};