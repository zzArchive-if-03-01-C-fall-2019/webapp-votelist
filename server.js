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
    const votepolls = [{
        titel: 'Test Votepoll',
        createdAt: new Date(),
        description: 'test'
    },
    {
        titel: 'Test Votepoll2',
        createdAt: new Date(),
        description: 'test2'
    }]
    res.render('votepolls/index', {votepolls: votepolls})
})
app.use('/votepolls', votepollRouter)
app.listen(3000)