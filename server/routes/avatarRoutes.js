const express = require("express");
const router = express.Router();
const SaleItem = require('../models/saleItem');


require('dotenv').config();
const port = process.env.PORT;

const IMAGE_URL = process.env.NODE_ENV === 'production'
  ? "https://rummage-app.herokuapp.com/"
  : `http://localhost:${port}/`;

router.put('/:id', (req, res) => {
        if(!req.files) {
            res.status(500).send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let avatar = req.files.avatar;
            avatar.mv(`./public/sale_item_images/image-for-sale-item-${req.params.id}.jpg`);
            const currentImage = `${IMAGE_URL}static/sale_item_images/image-for-sale-item-${req.params.id}.jpg`
            
            SaleItem
                .where({ id: req.params.id })
                .fetch()
                .then(saleItem => {
                    return saleItem.save({
                        name: req.body.itemName ? req.body.itemName : saleItem.name,
                        description: req.body.description ? req.body.description : saleItem.description,
                        image_URL: currentImage ? currentImage : saleItem.image_URL,
                        condition: req.body.condition ? req.body.condition : saleItem.condition,
                        category: req.body.category ? req.body.category : saleItem.category,
                        price: req.body.price ? req.body.price : saleItem.price,
                    });
                })
                .then((_updatedSaleItem) => {
                    res.status(200).send({
                        status: true,
                        message: 'File is uploaded',
                        data: {
                            name: avatar.name,
                            mimetype: avatar.mimetype,
                            size: avatar.size,
                            saleItemId: req.params.id
                        }
                    });
                })
        }
});

module.exports = router;