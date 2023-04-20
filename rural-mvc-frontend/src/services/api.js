import axios from "axios";

const customerApi = axios.create({ baseURL: "http://localhost:8080/customer" });
const producerApi = axios.create({ baseURL: "http://localhost:8080/producer" });
const productApi = axios.create({ baseURL: "http://localhost:8080/product" });
const baseunitApi = axios.create({ baseURL: "http://localhost:8080/baseunit" });
const salesApi = axios.create({ baseURL: "http://localhost:8080/sales" });

export { customerApi, producerApi, productApi, baseunitApi, salesApi };
