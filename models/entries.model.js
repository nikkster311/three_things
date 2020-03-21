const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const entriesSchema = new Schema({
  username: { type: String, required: true },
  entry1: { type: String, required: true },
  entry2: { type: String, required: true },
  entry3: { type: String, required: true },
  date: { type: Date, required: true }

}, {
  timestamp: true,
});

const Entry = mongoose.model('Entry', entriesSchema);

module.exports = Entry;
