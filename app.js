const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');


// Db connection
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost:27017/registeration').then(()=> {
    console.log('connected successfully..')
});



const app = express();

// view engine
app.set('view engine', 'ejs');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


// Routes

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.render('register');
});

bodyParser.urlencoded({ extended: true })
app.listen(3000, () => {
    console.log(`listenning on port 3000....`);
})