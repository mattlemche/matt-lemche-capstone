const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const loginRoutes = require('./routes/loginRoutes')
const userRoutes = require('./routes/userRoutes');
const yardSaleRoutes = require('./routes/yardSaleRoutes');
const saleItemRoutes = require('./routes/saleItemRoutes');
const avatarRoutes = require('./routes/avatarRoutes');
const favouriteRoutes = require('./routes/favouriteRoutes');
const path = require("path");


require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(fileUpload({
    createParentPath: true
}));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/static', express.static('public'))

app.use('/api/login', loginRoutes)
app.use('/api/user', userRoutes);
app.use('/api/yard-sale', yardSaleRoutes);
app.use('/api/sale-item', saleItemRoutes);
app.use('/api/avatar-upload', avatarRoutes);
app.use('/api/favourite', favouriteRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("../client/build"));
    
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Express is listenting on port ${PORT}`);
})