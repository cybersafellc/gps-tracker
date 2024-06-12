const validateAccessToken = async (accessToken) => {
  try {
    const responses = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/users/verify-token`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const res = await responses.json();
    if (res.error) {
      throw new Error(res.message);
    }
    return true;
  } catch (error) {
    return false;
  }
};

const refreshToken = async (refresh_token, callback) => {
  try {
    const responses = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/users/refresh-token`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      }
    );
    const res = await responses.json();
    if (res.error) {
      throw new Error(res.message);
    }
    callback(false, res.data.access_token);
    return;
  } catch (error) {
    callback(error, false);
    return;
  }
};

export { validateAccessToken, refreshToken };
