const express = require("express");
const router = express.Router();
const User = require('../models/user');




router
    .route('/')
    .get((req, res) => { // get user info

        User
            .where(req.query)
            .fetchAll()
            .then(users => {
                res.status(200).json((users));
            })
            .catch(err => {
                res.status(400).json({ "error": `Unknown query parameter "${req.query}"`, "system message": err})
            });
    })
    .post((req, res) => { // create new user
        new User({
            username: req.body.username,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            profile_image: "",
            location: JSON.stringify(req.body.location),
        })
        .save()
        .then(user => {
            res.status(201).json(user);
        });
    });

router 
    .route('/:username')
    .get((req, res) => {
        User
            .where({ username: req.params.username })
            .fetch(({withRelated: ['yardSales'] }))
            .then(user => {
                res.status(200).json(user);
            });
    })
    .put((req, res) => {
        User    
            .where({ id: req.params.id })
            .fetch()
            .then(user => {
                return user.save({
                    username: req.body.username ? req.body.username : user.username,
                    password: req.body.password ? req.body.password : user.password,
                    first_name: req.body.first_name ? req.body.first_name : user.first_name,
                    last_name: req.body.last_name ? req.body.last_name : user.last_name,
                    email: req.body.email ? req.body.email : user.email,
                    phone: req.body.phone ? req.body.phone : user.phone,
                    profile_image: req.body.profile_image ? req.body.profile_image : user.profile_image,
                    location: JSON.stringify(req.body.location) ?
                            JSON.stringify(req.body.location) : 
                            user.location,
                })
            })
            .then(updatedUser => {
                res.status(200).json(updatedUser);
            });
    })
    .delete((req, res) => {
        User    
            .where({ id: req.params.id })
            .destroy()
            .then(deletedUser => {
                res.status(204).json(deletedUser)
            });
    });

module.exports = router;