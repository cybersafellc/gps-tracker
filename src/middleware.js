import { NextResponse } from "next/server";
import { isAlreadyLoginMiddleware } from "./middlewares/isAlreadyLogin";

const isAlreadyLoginUrl = ["/login", "/signup"];

export async function middleware(request) {
  const url = new URL(request.url);
  if (isAlreadyLoginUrl.includes(url.pathname)) {
    const responses = await isAlreadyLoginMiddleware(request);
    return responses;
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matchers: ["/dashboard", "/login", "/signup"],
};
