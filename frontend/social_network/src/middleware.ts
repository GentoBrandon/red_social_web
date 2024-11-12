import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes: string[] = [
  '/dashboard',
  '/dashboard/friends',
  '/users/friends',
  '/users/information',
  '/users/posts'
];

async function middleware(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(pathname);

  console.log("Token present:", !!token, "Pathname:", pathname); // Para depuración

  if (isProtectedRoute && !token) {
    console.log("Redirecting to login due to missing token.");
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export default middleware;
