import axios from "axios";

const BASE_URL = "https://dummyjson.com"; 

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

export const login = async(
    credentials:LoginPayload
): Promise<LoginResponse> =>{
    const response = await
    axios.post<LoginResponse>(
        `${BASE_URL}/auth/login`,
        {
        username: credentials.username,
        password: credentials.password,
        expiresInMins: 30,

        }
    );
    return response.data;
}