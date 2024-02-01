"use server";

import SignInForm from "./_components/SignInForm";


export interface SignInPageProps {
    searchParams: { 
        error?: string;
        callbackUrl?: string; 
    }
};

const SignInPage = async ({ searchParams }: SignInPageProps) => {    
    return (
        <div className="w-full py-20">
            <SignInForm searchParams={searchParams} />
        </div>
    );
};


export default SignInPage;