require('dotenv').config();
console.log(process.env)
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const path = require('path');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_DB)

app
  .use(express.static(path.join(__dirname, '/client/build')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
  console.log('proxy at index')
});

app.get('/api/workouts', (req, res) => {
  console.log('/api/workouts');
  res.json([
      {
          title: "Arms & Shoulders Day",
          exercises: ["barbell curl", "two-hand tricep pull down", "two-handing bar curl", "hammer curls"]
      },
      {
          title: "Leg Day",
          exercises: ["leg press"]
      },
      {
          title: "Chest & back Day",
          exercises: ["push-ups", "barbell bench press"]
      }
  ])
})