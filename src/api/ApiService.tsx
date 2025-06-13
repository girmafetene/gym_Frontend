import axios from "axios";

const BASE_URL = "http://localhost:9000/api";

const getAll = async (url: string) => {
  return await axios.get(BASE_URL + url);
};

const getByType = async (url: string) => {
  return await axios.get(BASE_URL + url);
};

const create = async (url: string, data: any) => {
  return await axios.post(BASE_URL + url, data);
};

const getById = async (url: string, id: string) => {
  return await axios.get(BASE_URL + url + "/" + id);
};

const update = async (url: string, data: any, id: string) => {
  return await axios.patch(BASE_URL + url + "/" + id, data);
};
const remove = async (url: string, id: string) => {
  return await axios.delete(BASE_URL + url + '/' + id);
}

// const uploadFile = async (url, formData, config) => {
//     return await axios.post(BASE_URL + url, formData, config);
// }

// const updateFile = async (url, formData, config) => {
//     return await axios.put(BASE_URL + url, formData, config);
// }



export const apiService = {
  getAll,
  create,
  getById,
  update,
  remove,
  getByType,
};
