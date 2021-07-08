const exprees = require('express');
const router = new exprees.Router();
const Song = require('../models/song');

const Chord = require('../models/user');


router.post('/get-songs',async (req, res) => {
    Song.find({ $and : [{ $where: "this.chords.length > 0" } , { $where: "this.chords.length < 20" }]}).sort( { name : -1 } ).limit(21)
    .then(allSongsData => {
        
        res.send(allSongsData)
    }).catch(e => console.log(e))
})

router.post('/get-chords',async (req, res) => {
    Chord.find({})
    .then(allChordsData => {
        res.send(allChordsData)
    }).catch(e => console.log(e))
})



module.exports = router;