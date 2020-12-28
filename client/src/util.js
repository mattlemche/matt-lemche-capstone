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
}
export const yardSaleDelete = (saleId) => {
    return `${API_URL}yard-sale/${saleId}`
}

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
]