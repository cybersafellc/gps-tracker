const getTracking = async (access_token) => {
  const responses = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/trackings`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );
  const res = await responses.json();
  return res.data;
};

export default getTracking;
