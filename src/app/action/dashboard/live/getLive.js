import { getCookie } from "cookies-next";

export const getLive = async (tracking_id) => {
  const access_token = getCookie("access_token");
  const responses = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/trackings?live=${tracking_id}`,
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

const getLiveServer = async (access_token, tracking_id) => {
  const responses = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/trackings?live=${tracking_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );
  const res = await responses.json();
  if (res.data) {
    return true;
  } else {
    return false;
  }
};

export default { getLive, getLiveServer };
