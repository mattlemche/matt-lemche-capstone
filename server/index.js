const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const yardSaleRoutes = require('./routes/yardSaleRoutes');
const saleItemRoutes = require('./routes/saleItemRoutes');
const avatarRoutes = require('./routes/avatarRoutes');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');


const PORT = process.env.PORT || 5000;

app.use(fileUpload({
    createParentPath: true
}));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/user', userRoutes);
app.use('/yard-sale', yardSaleRoutes);
app.use('/sale-item', saleItemRoutes);
app.use('/avatar-upload', avatarRoutes);

app.listen(PORT, () => {
    console.log(`Express is listenting on port ${PORT}`);
})