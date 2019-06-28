const Knex = require("knex");
const knexOptions = require("./knexFile");
const knex = Knex(knexOptions);

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
    var values = {
        userFirstName: req.body.userFirstname,
        userLastName: req.body.userLastname,
        username: req.body.username,
        password: req.body.password,
        email : req.body.email,
        phonenumber: req.body.phonenumber,
        youraddress: req.body.youraddress

    };
    console.log(req);
    knex('users')
    .insert(values)
    .then(
        ()=>{
            res.end("User has been registered!")
        }
    )
}


module.exports = {
    getUser : getUser,
    addUser : addUser,
   
};