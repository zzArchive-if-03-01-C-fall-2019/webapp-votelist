const express = require('express')
const mongoose = require('mongoose')
const votepollRouter = require('./routes/votepolls')
const app = express()

app.set('view engine', 'ejs')

app.use('/votepolls', votepollRouter)

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

app.listen(3000)