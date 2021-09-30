const express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
    res.send({ version: 'Resto V2.0'});
});

module.exports = router;