import { NextResponse } from "next/server";
import { isAlreadyLoginMiddleware } from "./middlewares/isAlreadyLogin";
import authMiddleware from "./middlewares/auth";
import logoutMiddleware from "./middlewares/logOut";

const isAlreadyLoginUrl = ["/login", "/signup"];
const auth = ["/dashboard"];
const logout = ["/logout"];

export async function middleware(request) {
  const url = new URL(request.url);
  if (isAlreadyLoginUrl.includes(url.pathname)) {
    const responses = await isAlreadyLoginMiddleware(request);
    return responses;
  } else if (auth.includes(url.pathname)) {
    const responses = await authMiddleware(request);
    return responses;
  } else if (logout.includes(url.pathname)) {
    const responses = await logoutMiddleware(request);
    return responses;
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matchers: ["/dashboard", "/login", "/signup", "/logout"],
};
