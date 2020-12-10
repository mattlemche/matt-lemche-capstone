const API_URL = 'http://localhost:8080/'
export const getAllItems = `${API_URL}sale-item`;
export const getAllSales = `${API_URL}yard-sale`;
export const getUserInfo = (userId) => {
    return `${API_URL}user/${userId}`;
};
export const getItemInfo = (itemId) => {
    return `${API_URL}sale-item/${itemId}`;
};
export const getSaleInfo = (saleId) => {
    return `${API_URL}yard-sale/${saleId}`;
};