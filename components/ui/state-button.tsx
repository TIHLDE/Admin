"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { LoadingSpinner } from "./spinner";


interface StateButtonProps {
    idleText: string;
    loadingText: string;
    className?: string;
};

export const StateButton = ({ idleText, loadingText, className }: StateButtonProps) => {
    const { pending } = useFormStatus();

    return (
        <Button
            className={className}
            disabled={pending}
        >
            { 
                pending
                    ? (
                        <>
                            <LoadingSpinner className="mr-2" />
                            <p>
                                { loadingText }
                            </p>
                        </>
                    )
                    : idleText
            }
        </Button>
    );
};

