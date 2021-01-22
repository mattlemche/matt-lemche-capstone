import slide1 from './assets/images/rummage-intro-1.png';
import slide2 from './assets/images/rummage-intro-2.png';
import slide3 from './assets/images/rummage-intro-3.png';
import slide4 from './assets/images/rummage-intro-4.png';

const API_URL = process.env.NODE_ENV === 'production'
? 'https://rummage-app.herokuapp.com/api/' : 'http://localhost:8080/api/';


export const getAllItems = `${API_URL}sale-item`;
export const getAllSales = `${API_URL}yard-sale`;
export const newUser = `${API_URL}user`;
export const getUserInfo = (username) => {
    return `${API_URL}user/${username}`;
};
export const getUserFavourites = (userId) => {
    return `${API_URL}favourite/${userId}`;
};
export const getItemInfo = (itemId) => {
    return `${API_URL}sale-item/${itemId}`;
};
export const getSaleInfo = (saleId) => {
    return `${API_URL}yard-sale/${saleId}`;
};
export const login = (username) => {
    return `${API_URL}login/${username}`;
};
export const imageUpload = (saleItemId) => {
    return `${API_URL}avatar-upload/${saleItemId}`;
};
export const favouriteDelete = (favId) => {
    return `${API_URL}favourite/${favId}`;
};
export const yardSaleDelete = (saleId) => {
    return `${API_URL}yard-sale/${saleId}`
};

export const categories = [
    "antiques",
"appliances",
"arts + crafts",
"automotive",
"baby + kid",
"beauty + health",
"bikes",
"books",
"camping",
"cds/dvd/vhs",
"clothes + accessories",
"collectibles",
"electronics",
"farm + garden",
"furniture",
"household",
"jewelry",
"music",
"photo + video",
"sports",
"tools",
"toys + games",
"videogaming",
];


export const slideList = [
    {
        id: 1,
        text: `Rummage is your online space for a yard sale`,
        subtitle: "(even if you don’t have a yard)",
        imageUrl: slide1,
        alt: "illustration of objects with pricing"
    },
    {
        id: 2,
        text: "Find amazing stuff at great prices! Create your own Yard Sale!",
        imageUrl: slide2,
        alt: "illustration of creating a new sale and browsing local sales"
    },
    {
        id: 3,
        text: "What's Sunset Pricing? When a sale is almost over, prices automatically drop!",
        imageUrl: slide3,
        alt: "illustration of sunset pricing icon"
    },
    {
        id: 4,
        text: `Ready to get started? Sign up and start Rummaging!`,
        imageUrl: slide4,
        alt: "illustration of simplified app interface"
    },
];