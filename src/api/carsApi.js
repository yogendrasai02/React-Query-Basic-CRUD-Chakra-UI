import axios from 'axios';

const apiBaseUrl = 'http://localhost:3000/cars';

const axiosInstance = axios.create({ baseURL: apiBaseUrl });

// export const getAllCars = () => {
//   return axiosInstance.get('/').then(response => {
//     console.log('GET ALL CARS successful, response:', response);
//     return response.data;
//   });
// };
export const getAllCars = async () => {
  const response = await axiosInstance.get('/');
  console.log('GET ALL CARS successful, response:', response);
  return response.data;
};

export const getCarById = async (id) => {
  const response = await axiosInstance.get(`/${id}`);
  console.log(`GET CAR with ID ${id} successful, response:`, response);
  return response.data;
};

export const addCar = async (newCarData) => {
  const response = await axiosInstance.post('/', newCarData);
  console.log(`POST CAR successful, response:`, response);
  return response.data;
};

export const updateCar = async (updatedCarData) => {
  const response = await axiosInstance.put(`/${updatedCarData.id}`, updatedCarData);
  console.log(`PUT CAR with ID ${updatedCarData.id} successful response:`, response);
  return response.data;
};

export const deleteCar = async (id) => {
  const response = await axiosInstance.delete(`/${id}`);
  console.log(`DELETE CAR with ID ${id} successful, response:`, response);
  return response.data;
};
