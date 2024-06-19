import axios, { AxiosInstance } from "axios";

//const api_url = "http://localhost:8084/api/v1/";
//const api_url = "http://localhost:8080/demo-0.0.1-SNAPSHOT/api/v1/";
const api_url = "http://localhost:8084/api/v1/";

var api_endpoint: AxiosInstance = axios.create({ baseURL: api_url });

export { api_endpoint };