import axiosInstance from './axiosInstance';

const orderApi = {
  create: (address) =>
    axiosInstance.post('/orders', null, { params: { address } }),
  getAll: () => axiosInstance.get('/orders'),
  getAllAdmin: () => axiosInstance.get('/orders/all'),
  getById: (id) => axiosInstance.get(`/orders/${id}`),
  updateStatus: (id, status) =>
    axiosInstance.patch(`/orders/${id}/status`, null, { params: { status } }),
  cancel: (id) => axiosInstance.patch(`/orders/${id}/cancel`),
  delete: (id) => axiosInstance.delete(`/orders/${id}`),
};

export default orderApi;
