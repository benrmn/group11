const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    const str = [{
        "tst": "test"
    }];
    res.end(JSON.stringify(str));
});

router.post('/adduser', (req, res) => {
    res.end('not implemented yet');
});

module.exports = router;