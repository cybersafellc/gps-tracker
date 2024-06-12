"use client";

import login from "@/app/action/login/login";
import Link from "next/link";
import AlertError from "../Error-Alert";
import { useState } from "react";
import AlertSuccess from "../Success-Alert";
import { useRouter } from "next/navigation";

export default function Form() {
  const redirect = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [view, setView] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [successLogin, setSuccessLogin] = useState(false);

  const hanldeLogin = async (e) => {
    e.preventDefault();
    setView(false);
    setLoadingButton(true);
    await login(
      e.currentTarget.username.value,
      e.currentTarget.password.value,
      (err, success) => {
        if (err) {
          setLoadingButton(false);
          setErrorMessage(err.message);
          setView(true);
        } else {
          setSuccessLogin(true);
          redirect.push("/dashboard");
        }
        return;
      }
    );
  };
  return (
    <>
      <div>
        <AlertError message={errorMessage} view={view} />
        <AlertSuccess
          title="Login Success"
          details="Berhasil Masuk ke akun anda"
          view={successLogin}
        />
      </div>
      <form className="space-y-4 md:space-y-6" onSubmit={(e) => hanldeLogin(e)}>
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="satoshi2334"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required=""
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required=""
          />
        </div>

        {loadingButton ? (
          <button
            disabled
            className="flex justify-center items-center w-full text-white bg-cyan-800 cursor-progress focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-400"
          >
            <span className="loading loading-spinner loading-sm"></span>
          </button>
        ) : (
          <button
            type="submit"
            className="flex justify-center items-center w-full text-white bg-cyan-800 hover:bg-cyan-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-500"
          >
            Masuk
          </button>
        )}
        <p className="text-sm font-light text-gray-700">
          Belum memiliki akun ?{" "}
          <Link href="/signup" className="font-medium text-cyan-800">
            Daftar Sekarang
          </Link>
        </p>
      </form>
    </>
  );
}
