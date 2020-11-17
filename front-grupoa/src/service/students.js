import http from '../config/http';

export const studentApi = {
  findAll: () => http.get('/student'),
  create: (data) => http.post('/student', data),
  update: (id, data) => http.put(`/student/${id}`, data),
  delete: (id) => http.delete(`/student/${id}`),
};