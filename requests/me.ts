"use server";

import { API_URL } from "@/app/settings";
import { getToken, setAuthHeaders } from "@/app/auth";
import axios from "axios";


export type MyInfo = {
    user_id: string;
    first_name: string;
    last_name: string;
    image: string;
};

export type Permissions = {
    badgecategory: { write: boolean, read: boolean };
    userbadge: { write: boolean, read: boolean };
    jobpost: { write: boolean, read: boolean };
    weeklybusiness: { write: boolean, read: boolean };
    banner: { write: boolean, read: boolean };
    notification: { write: boolean, read: boolean };
    usernotificationsetting: { write: boolean, read: boolean };
    warning: { write: boolean, read: boolean };
    category: { write: boolean, read: boolean };
    cheatsheet: { write: boolean, read: boolean };
    event: { write: boolean, write_all: boolean, read: boolean };
    news: { write: boolean, read: boolean };
    page: { write: boolean, read: boolean };
    qrcode: { write: boolean, read: boolean };
    registration: { write: boolean, read: boolean };
    shortlink: { write: boolean, read: boolean, destroy: boolean };
    strike: { write: boolean, read: boolean, destroy: boolean };
    strikesoverview: { write: boolean, read: boolean };
    toddel: { write: boolean, read: boolean };
    user: { write: boolean, read: boolean };
    reaction: { write: boolean, read: boolean };
    eventform: { write: boolean, read: boolean };
    form: { write: boolean, read: boolean };
    groupform: { write: boolean, read: boolean };
    submission: { write: boolean, read: boolean };
    album: { write: boolean, read: boolean };
    picture: { write: boolean, read: boolean };
    fine: { write: boolean, read: boolean, destroy: boolean };
    group: { write: boolean, read: boolean };
    law: { write: boolean, read: boolean };
    membership: { write: boolean, read: boolean };
    membershiphistory: { write: boolean, read: boolean };
    order: { write: boolean, read: boolean };
}

export type MyPermissions = {
    permissions: {
        [key: string]: { write: boolean, read: boolean, destroy: boolean, write_all: boolean }
    }
};

export const getMyInfo = async (): Promise<MyInfo | null> => {
    const token = getToken();

    if (!token) return null;

    const headers = setAuthHeaders(token);
    const url = `${API_URL}/users/me/`;

    const response = await axios.get<MyInfo>(url, headers);

    return response.data;
};

export const getMyPermissions = async () => {
    const token = getToken();

    if (!token) return null;

    const headers = setAuthHeaders(token);
    const url = `${API_URL}/users/me/permissions/`;

    const response = await axios.get<MyPermissions>(url, headers);

    return response.data;
};