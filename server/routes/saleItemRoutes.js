const express = require("express");
const router = express.Router();
const SaleItem = require('../models/saleItem');
const YardSale = require("../models/yardSale");

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
        YardSale
            .where({ id: req.body.sale_ID })
            .fetch()
            .then(yardSale => {
                return yardSale.id;
            })
            .then(sellerId =>{
                new SaleItem({
                    description: req.body.description,
                    image_URL: req.body.image_URL,
                    condition: req.body.condition,
                    categories: JSON.stringify(req.body.categories),
                    price: req.body.price,
                    sale_ID: req.body.sale_ID,
                    seller_ID: sellerId,
                })
                .save()
                .then(saleItem => {
                    res.status(201).json(saleItem);
                });
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
                    description: req.body.description ? req.body.description : saleItem.description,
                    image_URL: req.body.image_URL ? req.body.image_URL : saleItem.image_URL,
                    condition: req.body.condition ? req.body.condition : saleItem.condition,
                    categories: JSON.stringify(req.body.categories) ? JSON.stringify(req.body.categories) : saleItem.categories,
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