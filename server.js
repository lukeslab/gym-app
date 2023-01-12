require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

const PORT = process.env.PORT || 8080;

// mongoose.connect(process.env.MONGO_DB)

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))

app.use(express.static('client/build'))
app.use('/', require('./routes/root'))
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views/404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found');
    }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Listening on ${PORT}`));



// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build/index.html'));
//   console.log('proxy at index')
// });


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