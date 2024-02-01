"use server";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInfo } from "./auth";
import { getFallbackName } from "@/lib/utils";


const Navbar = async () => {
    const userInfo = getUserInfo();

    
    return (
        <header className="px-4 py-2 md:px-12 md:py-4 border border-b-primary-foreground flex items-center justify-between">
            <div>
                <img 
                    className="w-28 md:w-32"
                    src="/logo.png" 
                    alt="Logo" 
                />
            </div>

            { userInfo && (
                <Avatar>
                    <AvatarImage 
                        src={userInfo.image}
                        alt="Profilbilde"
                    />
                    <AvatarFallback>
                        { getFallbackName(userInfo.name) }
                    </AvatarFallback>
                </Avatar>
            ) }
        </header>
    );
};


export default Navbar;