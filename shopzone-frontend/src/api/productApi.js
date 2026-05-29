import axiosInstance from './axiosInstance';

const productApi = {
  getAll: (page = 0, size = 10) =>
    axiosInstance.get(`/products?page=${page}&size=${size}`),
  getById: (id) => axiosInstance.get(`/products/${id}`),
  create: (product) => axiosInstance.post('/products', product),
  update: (id, product) => axiosInstance.put(`/products/${id}`, product),
  delete: (id) => axiosInstance.delete(`/products/${id}`),
};

export default productApi;
