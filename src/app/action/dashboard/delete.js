import { getCookie } from "cookies-next";

const deletes = async (tracking_id, callback) => {
  try {
    const access_token = getCookie("access_token");
    const responses = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/trackings`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tracking_id: tracking_id,
        }),
      }
    );
    const res = await responses.json();
    if (res.error) {
      throw new Error(res.message);
    }
    callback(false, res.message);
  } catch (error) {
    callback(error, false);
    return;
  }
};

export default deletes;
