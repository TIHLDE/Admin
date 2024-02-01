"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";

import { SignInPageProps } from "../page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import login, { LoginState } from "@/app/actions/auth/login";
import { useRouter } from "next/navigation";
import { StateButton } from "@/components/ui/state-button";
import { toast } from "sonner";


const initialLoginState: LoginState = {
    status: "idle",
    errors: undefined,
    form: {
        user_id: "",
        password: ""
    }
};

const SignInForm = ({ searchParams }: SignInPageProps) => {
    const [state, formAction] = useFormState(login, initialLoginState);
    const router = useRouter();

    useEffect(() => {
        if (searchParams.error) alert(searchParams.error);
    }, [searchParams.error]);


    useEffect(() => {
        if (state.status === "success") {
            router.push(searchParams.callbackUrl || "/");
            router.refresh();
        } else if (state.status === "field-error") {
            toast("Feil i skjemaet", {
                description: "Sjekk at du har fylt ut alle feltene riktig."
            });
        } else if (state.status === "error") {
            toast("Feil ved innlogging", {
                description: "Brukernavn eller passord er feil."
            });
        }
    }, [state]);


    return (
        <Card className="max-w-md w-full mx-auto">
            <CardHeader>
                <img
                    className="w-[200px] mx-auto" 
                    src="/logo.png"
                    alt="Logo" 
                />
            </CardHeader>
            <CardContent className="mt-6">
                <form 
                    action={formAction}
                    className="space-y-4"
                >
                    <div className='space-y-2'>
                        <Label>
                            Brukernavn
                        </Label>
                        <Input 
                            name="user_id"
                            type='text'
                        />
                    </div>
                    <div className='pb-4 space-y-2'>
                        <Label>
                            Passord
                        </Label>
                        <Input 
                            name="password"
                            type='password'
                        />
                    </div>

                    <StateButton 
                        className="w-full"
                        idleText="Logg inn"
                        loadingText="Logger inn..."
                    />
                </form>
                <Card className='mt-6'>
                    <CardHeader>
                        <CardTitle className='text-md'>
                            Logg inn med TIHLDE
                        </CardTitle>
                        <CardDescription className='text-sm'>
                            Bruk ditt brukernavn og passord fra TIHLDE for å logge inn
                        </CardDescription>
                    </CardHeader>
                </Card>
            </CardContent>
        </Card>
    );
};

export default SignInForm;