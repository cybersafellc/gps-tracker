const postGps = async (lat, long, accuracy, tracking_token) => {
  const responses = await fetch(`${process.env.NEXT_PUBLIC_API}/api/tracker`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tracking_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lat: lat,
      long: long,
      accuracy: accuracy,
    }),
  });
  return;
};

export default postGps;
