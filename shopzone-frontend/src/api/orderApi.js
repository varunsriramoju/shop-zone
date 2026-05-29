import axiosInstance from './axiosInstance';

const orderApi = {
  create: (address) =>
    axiosInstance.post('/orders', null, { params: { address } }),
  getAll: () => axiosInstance.get('/orders'),
  getAllAdmin: () => axiosInstance.get('/orders/all'),
  getById: (id) => axiosInstance.get(`/orders/${id}`),
  updateStatus: (id, status) =>
    axiosInstance.patch(`/orders/${id}/status`, null, { params: { status } }),
};

export default orderApi;
