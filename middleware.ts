import { NextRequest, NextResponse } from "next/server";


export const config = {
    matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};

export const middleware = (request: NextRequest) => {
    const token = request.cookies.get("token");
    const isLoginPath = request.url.includes("/signIn");

    if (!token) {
        if (!isLoginPath) {
            const url = new URL("signIn", request.url);
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    if (isLoginPath && token) {
        const url = new URL("/", request.url);
        return NextResponse.redirect(url);
    };

    return NextResponse.next();
}; 