import { getCookie } from "cookies-next";

const tambahkan = async (device_name, callback) => {
  try {
    const access_token = getCookie("access_token");
    const responses = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/trackings`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device_name: device_name,
        }),
      }
    );
    const res = await responses.json();
    if (res.error) {
      throw new Error(res.message);
    }
    callback(false, res.message);
    return;
  } catch (error) {
    callback(error, false);
    return;
  }
};

export default tambahkan;
