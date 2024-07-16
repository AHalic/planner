import axios from "axios";

// TODO: add get from env
export const api = axios.create({
    // baseURL: process.env.REACT_APP_API_URL
    baseURL: 'http://localhost:3333'
});
