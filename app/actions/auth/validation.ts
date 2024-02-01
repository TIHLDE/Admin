import { z } from "zod";

import { LoginForm } from "./login";


export const parseLoginForm = (formData: FormData): LoginForm => {
    const user_id = formData.get("user_id") as string;
    const password = formData.get("password") as string;

    return { user_id, password };
};

export const loginSchema = z.object({
    user_id: z.string(),
    password: z.string()
});