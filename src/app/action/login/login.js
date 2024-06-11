import { setCookie } from "cookies-next";

const login = async (username, password, callback) => {
  try {
    const responses = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );

    const res = await responses.json();
    if (res.error) {
      throw new Error(res.message);
    }
    setCookie("access_token", res.data.access_token);
    setCookie("refresh_token", res.data.refresh_token);
    callback(false, res.message);
    return;
  } catch (error) {
    callback(error, false);
    return;
  }
};

export default login;
