import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (newObject) => {
  const request = axios.put(`${baseUrl}/${newObject.name}`, newObject);
  return request.then((response) => response.data);
};

const deleteEntry = (name) => {
  const request = axios.delete(`${baseUrl}/${name}`);
  console.log(request);
  return request.then((response) => response.data);
};
const service = { getAll, create, update, deleteEntry };

export default service;
