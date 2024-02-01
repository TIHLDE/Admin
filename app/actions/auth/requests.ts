"use server";

import axios from "axios";

import { API_URL } from "@/app/settings";
import { LoginForm } from "./login";


export const loginRequest = async (loginForm: LoginForm): Promise<string> => {
    const url = `${API_URL}/auth/login/`;
    const response = await axios.post<{ token: string }>(url, loginForm);
    console.log(response.data);
    return response.data.token;
};