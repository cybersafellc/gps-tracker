import { NextResponse } from "next/server";

export const isAlreadyLoginMiddleware = async (request) => {
  const accessToken = await request.cookies.get("access_token");
  const refreshToken = await request.cookies.get("refresh_token");
  console.log(new URL(request.url).pathname);
  if (accessToken || refreshToken) {
    const responses = NextResponse.redirect(new URL("/", request.url));
    return responses;
  }
  return NextResponse.next();
};
