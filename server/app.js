const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const Event = require('./models/event');
const dbUrl = 'mongodb://localhost:27017/event';

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', true);

mongoose.connect(dbUrl, dbErr => {
  if (dbErr) throw new Error(dbErr)
  else console.log('db connected')
  
  // MongoDBに接続してからサーバーを立てるために
  // app.listen()をmongoose.connect()の中に移動
  app.listen(PORT, err => {
    if (err) throw new Error(err)
    else console.log(`listening on port ${PORT}`)
  })
})


const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = new Event(req.body);
  event.save((err, addedEvent) => {
    if (err)
      return res.status(400).json({
        errorMessage: 'failed to add the event.'
      });
    res.send(addedEvent);
  });
});

app.get('/events', (req, res) => {
  Event.find({}, (err, events) => {
    res.send(events);
  });
});

app.get('/events/:id', (req, res) => {
  const id = req.params.id;
  Event.findById(id, (err, event) => {
    if (err)
      return res.status(400).json({
        errorMessage: 'the event not found.'
      });
    res.send(event);
  });
});

app.delete('/events/:id', (req, res) => {
  const id = req.params.id;
  Event.findByIdAndRemove(id, (err, deletedEvent) => {
    if (err)
      return res.status(400).json({
        errorMessage: 'failed to delete the event.'
      });
    res.send(deletedEvent);
  });
});

app.delete('/events', (req, res) => {
  Event.remove({}, err => {
    if (err)
      return res.status(400).json({
        errorMessage: 'failed to delete all events.'
      });
    res.send(true);
  });
});

module.exports = app;