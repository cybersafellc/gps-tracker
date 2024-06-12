import { verifyTrackingToken } from "@/action/token-transaction";
import { NextResponse } from "next/server";

const trackTokenVerifyMiddleware = async (request) => {
  const url = new URL(request.url);
  const token = url.pathname?.split("/")[2];
  const check = await verifyTrackingToken(token);
  if (!check) {
    const responses = NextResponse.rewrite(new URL("/404", request.url));
    return responses;
  }
  return NextResponse.next();
};

export default trackTokenVerifyMiddleware;
