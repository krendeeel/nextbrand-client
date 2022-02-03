import { IUser, loginUserData, registerUserData, ResponseUser, updateUserData } from "../../types/Auth.type";
import axios from "../axios";
import { setCookie } from 'nookies';

class AuthDataService {
    async getUser(): Promise<IUser> {
        const response = await axios.get<IUser>("/auth/user")
        return response.data
    }
    async updateUser(data: updateUserData): Promise<IUser> {
        const response = await axios.post<ResponseUser>("/auth/update", data);
        const { token, ...other } = response.data
        setCookie(null, 'token', token);
        return other;
    }
    async loginUser(data: loginUserData): Promise<IUser> {
        const response = await axios.post<ResponseUser>("/auth/login", data);
        const { token, ...other } = response.data
        setCookie(null, 'token', token);
        return other;
    }
    async registerUser(data: registerUserData): Promise<IUser> {
        const response = await axios.post<ResponseUser>("/auth/register", data);
        const { token, ...other } = response.data;
        document.cookie = `token=${token}; path=/`
        return other;
    }
}

export default new AuthDataService();