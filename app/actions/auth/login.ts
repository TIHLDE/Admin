"use server";

import { ZodError } from "zod";
import { loginSchema, parseLoginForm } from "./validation";
import { loginRequest } from "./requests";
import { cookies } from "next/headers";
import { getMyInfo } from "@/requests/me";


export type LoginForm = {
    user_id: string;
    password: string;
};

export type LoginState = {
    status: "idle" | "loading" | "error" | "success" | "field-error";
    errors: Record<keyof LoginForm, string> | string | undefined,
    form: LoginForm
};


const login = async (
    prevState: LoginState,
    formData: FormData
): Promise<LoginState> => {
    const loginForm = parseLoginForm(formData);

    try {
        const validation = loginSchema.parse(loginForm);

        const token = await loginRequest(validation);
        cookies().set("token", token);

        const me = await getMyInfo();

        if (!me) {
            return {
                status: "error",
                errors: "Kunne ikke hente brukerinformasjon",
                form: loginForm
            };
        }

        cookies().set("name", `${me.first_name} ${me.last_name}`);
        cookies().set("image", me.image);

        return {
            status: "success",
            errors: undefined,
            form: loginForm
        };

    } catch (e) {
        const error = e as Error;

        if (error instanceof ZodError) {
            return {
                status: "field-error",
                errors: {
                    user_id: error.issues[0]?.message,
                    password: error.issues[1]?.message
                },
                form: loginForm
            }
        }

        return {
            status: "error",
            errors: error.message,
            form: loginForm
        };
    }
};


export default login;