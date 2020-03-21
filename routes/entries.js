const router = require('express').Router();
let Entry = require('../models/entries.model');

//find
router.route('/').get((req, res) => {
  Entry.find()
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json("error: " + err));
});

//add
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const entry1 = req.body.entry1;
  const entry2 = req.body.entry2;
  const entry3 = req.body.entry3;
  const date = Date.parse(req.body.date);

  const newEntry = new Entry({
    username,
    entry1,
    entry2,
    entry3,
    date
  });

  newEntry.save()
    .then(() => res.json('entry saved!'))
    .catch(err => res.status(400).json('err: ' + err));
});

//FIND
router.route('/:id').get((req, res) => {
  Entry.findById(req.params.id)
    .then(entry => res.json(entry))
    .catch(err => res.status(400).json("errrrr" + err));
});

//delete
router.route('/:id').delete((req, res) => {
  Entry.findByIdAndDelete(req.params.id)
    .then(() => res.json('Entry deleted'))
    .catch(err => res.status(400).json('error: ' + err));
});

//update
router.route('/update/:id').post((req, res) => {
  Entry.findById(req.params.id)
    .then(entry => {
      entry.username = req.body.username;
      entry.entry1 = req.body.entry1;
      entry.entry2 = req.body.entry2;
      entry.entry3 = req.body.entry3;
      entry.date = Date.parse(req.body.date);

      entry.save()
        .then(() => res.json('entry updated'))
        .catch(err => res.status(400).json('err, : ' + err));
    })
    .catch(err => res.status(400).json('ERR, : ' + err));
});

module.exports = router;
