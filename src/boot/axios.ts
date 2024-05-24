import axios, { AxiosInstance } from "axios";

// /api/v1 for development, http://tesla:9089/price-list/api/v1/ for production
//const api_url = "http://localhost:8084/api/v1/";
//const api_url = "http://localhost:8080/demo-0.0.1-SNAPSHOT/api/v1/";
const api_url = "http://localhost:8084/api/v1/";
// const api_url = "http://10.145.30.70:8090/price-list/api/v1/";

var api_endpoint: AxiosInstance = axios.create({ baseURL: api_url });

export { api_endpoint };