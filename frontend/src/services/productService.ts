import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/products";

export const getProducts = async () => {
  const response = await axios.get(API_URL);

  console.log("API RESPONSE:", response.data);
  return response.data.products;
};

export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};