import { auth } from "@/app/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const { pathname } = req.nextUrl
    const isLoggedIn = !!req.auth

    const protectedRoutes = [
        '/lab/financas',
        '/lab/chat',
        '/lab/kanban',
        '/lab/encurtador/admin',
        '/lab/cms/novo',
        '/lab/hub'
    ]

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
