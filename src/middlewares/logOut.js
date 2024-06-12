import { NextResponse } from "next/server";

const logoutMiddleware = async (request) => {
  const responses = NextResponse.redirect(new URL("/login", request.url));
  responses.cookies.delete("access_token");
  responses.cookies.delete("refresh_token");
  return responses;
};

export default logoutMiddleware;
