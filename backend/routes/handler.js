const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    const str = [{
        "tst": "test"
    }];
    res.end(JSON.stringify(str));
});

router.post('/addPrivGenre', (req, res) => {
    const privGenre = req.body.privGenreInput;

    //const newPrivGenre = new
});

module.exports = router;