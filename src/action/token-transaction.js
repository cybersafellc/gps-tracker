const validateAccessToken = async (accessToken) => {
  try {
    const responses = await fetch(
      `${process.env.NEXT_PUBLIC_API}/users/verify-token`,
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

export { validateAccessToken };
