const express = require("express");
const router = express.Router();
const Favourite = require('../models/favourite');

router
    .route('/')
    .post((req, res) => {
        new Favourite({
            description: req.body.description,
            image_URL: req.body.image_URL,
            condition: req.body.condition,
            categories: JSON.stringify(req.body.categories),
            price: req.body.price,
            sale_item_id: req.body.sale_item_id,
            user_id: req.body.user_id,
        })
        .save()
        .then(favourite => {
            res.status(201).json(favourite);
        });
    });

router
    .route('/:id')
    .get((req, res) => {
        Favourite
            .where({ user_id: req.params.id })
            .fetchAll()
            .then(favourites => {
                res.status(200).json(favourites);
            });
    })
    .delete((req, res) => {
        Favourite
            .where({ id: req.params.id })
            .destroy()
            .then(deletedFavorite => {
                res.status(204).json(deletedFavorite);
            });
    });

module.exports = router;