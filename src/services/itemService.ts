import axios from 'axios';

// Create a configured Axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getItems = async () => {
  const res = await api.get('/items');
  return res.data;
};

export const createItem = async (data: any) => {
  const res = await api.post('/items', data);
  return res.data;
};

export const updateItem = async (data: any) => {
  const res = await api.put("/items", data);
  return res.data;
};

export const deleteItem = async (id: string | number) => {
  // Using data block allows us to pass body through DELETE standard compliant with Next.js endpoints
  const res = await api.delete("/items", {
    data: { id },
  });
  return res.data;
};
