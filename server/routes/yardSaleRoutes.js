const express = require("express");
const router = express.Router();
const YardSale = require('../models/yardSale');

router
    .route('/')
    .get((req, res) => { // get yard sale info

        YardSale
            .where(req.query)
            .fetchAll()
            .then(users => {
                res.status(200).json((users));
            })
            .catch(err => {
                res.status(400).json({ "error": `Unknown query parameter "${req.query}"`, "system message": err})
            });
    })
    .post((req, res) => { 
        new YardSale({
            location: JSON.stringify(req.body.location),
            name: req.body.name,
            description: req.body.description,
            duration: req.body.duration,
            status: req.body.status,
            user_id: req.body.user_id,
        })
        .save()
        .then(yardSale => {
            res.status(201).json(yardSale);
        })
    });

router
    .route('/:id')
    .get((req, res) => {
        YardSale
            .where({ id: req.params.id })
            .fetch({withRelated: ['saleItems'] })
            .then(yardSale => {
                res.status(200).json(yardSale);
            })
            .catch(err => {
                res.status(500).json({"error": "Cannot retrieve", "system message": err})
            });
    })
    .put((req, res) => {
        YardSale
            .where({ id: req.params.id })
            .fetch()
            .then(yardSale => {
                return yardSale.save({
                    location: JSON.stringify(req.body.location) ? JSON.stringify(req.body.location) : yardSale.location,
                    name: req.body.name ? req.body.name : yardSale.name,
                    description: req.body.description ? req.body.description : yardSale.description,
                    duration: req.body.duration ? req.body.duration : yardSale.duration,
                    status: req.body.status ? req.body.status : yardSale.status,
                    seller_ID: req.body.seller_ID ? req.body.seller_ID : yardSale.seller_ID,
                });
            })
            .then(updatedYardSale => {
                res.status(200).json(updatedYardSale)
            });
    })
    .delete((req, res) => {
        YardSale
            .where({ id: req.params.id })
            .destroy()
            .then(deletedYardSale => {
                res.status(204).json(deletedYardSale)
            });
    });

module.exports = router;