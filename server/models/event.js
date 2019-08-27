const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: String,
  desc: String,
  start: Date,
  end: Date,
  allDay: Boolean
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
