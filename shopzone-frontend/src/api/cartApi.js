import axiosInstance from './axiosInstance';

const cartApi = {
  getCart: () => axiosInstance.get('/cart'),
  addItem: (productId, quantity = 1) =>
    axiosInstance.post('/cart/add', null, { params: { productId, quantity } }),
  updateItem: (itemId, quantity) =>
    axiosInstance.put(`/cart/items/${itemId}`, null, { params: { quantity } }),
  clearCart: () => axiosInstance.delete('/cart/clear'),
};

export default cartApi;
