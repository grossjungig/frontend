import axios from "axios";
import { addAuthHeader } from './utils'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKENDURL
});

instance.interceptors.request.use(addAuthHeader);

export default instance;