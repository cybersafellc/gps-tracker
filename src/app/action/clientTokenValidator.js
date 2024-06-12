import { refreshToken, validateAccessToken } from "@/action/token-transaction";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const clientTokenValidator = async (redirect) => {
  const access_token = getCookie("access_token");
  const refresh_token = getCookie("refresh_token");

  const checkAccessToken = await validateAccessToken(access_token);
  if (!checkAccessToken) {
    await refreshToken(refresh_token, (err, newAccessToken) => {
      if (err) {
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        redirect.push("/login");
      } else {
        setCookie("access_token", newAccessToken);
      }
      return;
    });
  }
  return;
};

export default clientTokenValidator;
