require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn')

const PORT = process.env.PORT || 8080;

connectDB()

app.use(logger)

app.use(cors())
app.options("*", cors())

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))

app.use(express.static('client/build'))
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/users'))
app.use('/workouts', require('./routes/workouts'))
app.use('/exercises', require('./routes/exercises'))
app.use('/session', require('./routes/session'))
app.use('/data', require('./routes/data'))

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



mongoose.connection.once('open', ()=> {
    console.log('Connected to mongodb')
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})



// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build/index.html'));
//   console.log('proxy at index')
// });


