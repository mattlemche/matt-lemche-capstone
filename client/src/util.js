const API_URL = 'http://localhost:8080/'
export const getAllItems = `${API_URL}sale-item`;
export const getAllSales = `${API_URL}yard-sale`;
export const getUserInfo = (username) => {
    return `${API_URL}user/${username}`;
};
export const getFavourites = (username) => {
    return `${API_URL}favourite/${username}`;
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