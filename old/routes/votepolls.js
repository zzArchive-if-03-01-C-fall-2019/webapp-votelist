const express = require('express')
const Votepoll = require('./../models/votepoll')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('votepolls/new')
})

router.get('/:id', async (req, res) =>{
    const votepoll = await Votepoll.findById(req.params.id)
    if (votepoll == null) res.redirect('/')
    res.render('votepolls/show', { votepoll: votepoll})
})
router.post('/', async (req, res) => {
    let votepoll = new Votepoll({
        title: req.body.title,
        description: req.body.title,
    })
    try{
        votepoll = await votepoll.save()
        res.redirect(`/${votepoll.id}`)
    } catch (e) {
        res.render('/new', {votepoll: votepoll})
    }
})
module.exports = router