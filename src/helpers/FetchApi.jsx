import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, ACCESS_TOKEN } from "../constants";

const CustomAxios = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: API_URL,
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            const token = await AsyncStorage.getItem(ACCESS_TOKEN || '');
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType,
            }
            return config;
        }, err => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );

    return axiosInstance;
};

export default CustomAxios;