"use server";

import { cookies } from "next/headers";


export type UserInfo = {
    name: string;
    image: string;
};

export const setAuthHeaders = (token: string) => {
    return {
        headers: {
        "x-csrf-token": token,
        }
    }
};

export const getToken = (): string | undefined => {
    const tokenCookie = cookies().get("token");
    if (tokenCookie) return tokenCookie.value;
};

export const getUserInfo = (): UserInfo | undefined => {
    const nameCookie = cookies().get("name");
    const imageCookie = cookies().get("image");

    if (nameCookie && imageCookie) {
        return {
            name: nameCookie.value,
            image: imageCookie.value
        };
    }
};
  