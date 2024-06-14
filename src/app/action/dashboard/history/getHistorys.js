const getHistorysSSR = async (tracking_id, access_token) => {
  const responses = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/trackings/history?tracking_id=${tracking_id}`,
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

export default getHistorysSSR;
