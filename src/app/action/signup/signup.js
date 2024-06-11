const Register = async (name, username, email, phone, password, callback) => {
  try {
    const responses = await fetch(`${process.env.NEXT_PUBLIC_API}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        phone,
        password,
      }),
    });
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

export { Register };
