const express = require("express");
const router = express.Router();
const SaleItem = require('../models/saleItem');

router
    .route('/')
    .get((req, res) => { // get user info

        SaleItem
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
        
        new SaleItem({
            name: req.body.itemName,
            description: req.body.description,
            image_URL: req.body.image_URL,
            condition: req.body.condition,
            category: req.body.category,
            price: req.body.price,
            yard_sale_duration: req.body.yard_sale_duration,
            yard_sale_created_at: req.body.yard_sale_created_at,
            yard_sale_id: req.body.yard_sale_id,
            user_id: req.body.user_id,
        })
        .save()
        .then(saleItem => {
            res.status(201).json(saleItem);
        });
    });

router
    .route('/:id')
    .get((req, res) => {
        SaleItem
            .where({ id: req.params.id })
            .fetch()
            .then(saleItem => {
                res.status(200).json(saleItem);
            })
    })
    .put((req, res) => {
        SaleItem
            .where({ id: req.params.id })
            .fetch()
            .then(saleItem => {
                return saleItem.save({
                    name: req.body.itemName ? req.body.itemName : saleItem.name,
                    description: req.body.description ? req.body.description : saleItem.description,
                    image_URL: req.body.image_URL ? req.body.image_URL : saleItem.image_URL,
                    condition: req.body.condition ? req.body.condition : saleItem.condition,
                    category: req.body.category ? req.body.category : saleItem.category,
                    price: req.body.price ? req.body.price : saleItem.price,
                });
            })
            .then(updatedSaleItem => {
                res.status(200).json(updatedSaleItem);
            });
    })
    .delete((req, res) => {
        SaleItem
            .where({ id: req.params.id })
            .destroy()
            .then(deletedSaleItem => {
                res.status(204).json(deletedSaleItem);
            });
    });

module.exports = router;