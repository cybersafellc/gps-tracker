import { refreshToken, validateAccessToken } from "@/action/token-transaction";
import { NextResponse } from "next/server";

const authMiddleware = async (request) => {
  const access_token = request.cookies.get("access_token")?.value;
  const refresh_token = request.cookies.get("refresh_token")?.value;
  if (!access_token || !refresh_token) {
    const responses = NextResponse.redirect(new URL("/login", request.url));
    responses.cookies.delete("access_token");
    responses.cookies.delete("refresh_token");
    return responses;
  }

  const checkAccessToken = await validateAccessToken(access_token);
  if (!checkAccessToken) {
    let AccessToken = false;
    await refreshToken(refresh_token, (err, newAccessToken) => {
      if (err) {
        AccessToken = false;
      } else {
        AccessToken = newAccessToken;
      }
      return;
    });
    if (!AccessToken) {
      const responses = NextResponse.redirect(new URL("/login", request.url));
      responses.cookies.delete("access_token");
      responses.cookies.delete("refresh_token");
      return responses;
    }
    const responses = NextResponse.next();
    responses.cookies.set("access_token", AccessToken);
    return responses;
  }
  return NextResponse.next();
};

export default authMiddleware;
