import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAxios from './FetchApi';
import { ACCESS_TOKEN } from '../constants';

const RefreshToken = async ({ token, username, calback, logout }) => {
    try {
        if (token && username) {
            const api = 'api/refresh-token';
            const body = { token, username };
            const response = await CustomAxios().post(api, body);
            if (response) {
                if (response.error) {
                    logout();
                } else {
                    if (response.data && response.data.accessToken) {
                        await AsyncStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                        console.log('refresh token success', response.data.accessToken);
                        calback();
                        return;
                    } else {
                        logout();
                    }
                }
            } else {
                logout();
            }
        } else {
            console.log('token not found');
            logout();
        }
    } catch (error) {
        console.log('error refresh token: ', error);
        logout();
    }
};

export default RefreshToken;