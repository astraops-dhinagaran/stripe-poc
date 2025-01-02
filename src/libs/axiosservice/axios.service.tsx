import axios from "axios";
import { AxiosGetServiceType, AxiosPostServiceType } from "./axios.service.types";

export const GetAxiosService = async ({
    url
}: AxiosGetServiceType) => {
    try {
        let token: string = localStorage.getItem('auth_token')!;
        const response = await axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        if (response.status == 200 || response.status == 201) {
            return response.data
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}

export const PostAxiosService = async ({
    url, body
}: AxiosPostServiceType) => {
    try {
        const response = await axios.post(url, body);

        if (response.status == 200 || response.status == 201) {
            return response.data
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}

export const PostAxiosServiceWithToken = async ({
    url, body
}: AxiosPostServiceType) => {
    try {
        let token: string = localStorage.getItem('auth_token')!;

        const response = await axios.post(url, body, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        if (response.status == 200 || response.status == 201) {
            return response.data
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}
