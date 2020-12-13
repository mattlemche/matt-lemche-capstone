const express = require("express");
const router = express.Router();
const User = require('../models/user');


router
    .route('/:username')
    .post((req, res) => {

        User
            .where({ username: req.params.username })
            .fetch()
            .then(user => {
                if (req.body.password !== user.attributes.password) {
                    return res.status(401).json({ "error": "Incorrect password" });
                } else {
                    res.status(200).json(user);
                }
            })
            .catch(err => {
                res.status(400).json({ "error": "unkown username" });
            })
    })

module.exports = router;