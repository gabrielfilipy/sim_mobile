import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8085/'
});

export default http;