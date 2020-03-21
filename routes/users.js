const router = require('express').Router(); //need this bv we are creating a Router
let Users = require('../models/users.model');

//FIND
router.route('/').get((req, res) => {
  Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error:' + err));
});

//ADD
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const newUser = new Users({username});
  newUser.save()
    .then(() => res.json('user added!'))
    .catch(err => res.status(400).json('error : ' + err));
});


//UPDATE
router.route("/update/:id").post((req, res) => {
  Users.findById(req.params.id)
    .then(entry => {
      entry.username = req.body.username;

      entry.save()
        .then(() => res.json('user updated'))
        .catch((err) => res.status(400).json("error: " + err));
    })
    .catch(err => res.status(400).json("err " + err));
});


//DELETE
router.route("/:id").delete((req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(() => res.json("user deleted"))
    .catch((err) => res.status(400).json("error: " + err));
});

module.exports = router;
