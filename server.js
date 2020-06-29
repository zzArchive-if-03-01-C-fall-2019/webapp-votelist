const express = require('express')
const mongoose = require('mongoose')
const votepollRouter = require('./routes/votepolls')
const app = express()

mongoose.connect('mongodb://localhost/votepoll', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false}))

app.get('/', (req, res) => { 
    res.render('votepolls/index')
})

app.use('/', votepollRouter)
app.listen(3000)