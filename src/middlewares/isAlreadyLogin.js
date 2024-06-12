import { NextResponse } from "next/server";

export const isAlreadyLoginMiddleware = async (request) => {
  const accessToken = await request.cookies.get("access_token")?.value;
  const refreshToken = await request.cookies.get("refresh_token")?.value;
  console.log(new URL(request.url).pathname);
  if (accessToken || refreshToken) {
    const responses = NextResponse.redirect(new URL("/", request.url));
    return responses;
  }
  return NextResponse.next();
};
