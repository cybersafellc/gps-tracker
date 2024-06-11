"use client";
import { Register } from "@/app/action/signup/signup";
import Link from "next/link";
import AlertError from "../Error-Alert";
import AlertSuccess from "../Success-Alert";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const redirect = useRouter();
  const [loadingButton, setLoadingButton] = useState(false);
  const [viewErrorALert, setViewErrorALert] = useState(false);
  const [viewSuccessALert, setViewSuccessALert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoadingButton(true);
    setViewErrorALert(false);
    await Register(
      e.currentTarget.name.value,
      e.currentTarget.username.value,
      e.currentTarget.email.value,
      e.currentTarget.phone.value,
      e.currentTarget.password.value,
      (err, messageSuccess) => {
        if (err) {
          setLoadingButton(false);
          setLoadingButton(false);
          setErrorMessage(err.message);
          setViewErrorALert(true);
        } else {
          setViewSuccessALert(true);
          setTimeout(() => {
            redirect.push("/login");
          }, 2000);
        }
        return;
      }
    );
  };
  return (
    <>
      <AlertError view={viewErrorALert} message={errorMessage} />
      <AlertSuccess
        view={viewSuccessALert}
        title="Berhasil Mendaftar"
        details={
          <span>
            Akun anda berhasil terdaftar. Silahkan{" "}
            <Link href="/login">Login</Link>
          </span>
        }
      />
      <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
        <div>
          <label
            for="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Nama
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Satoshi Nakamoto"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required=""
          />
        </div>
        <div>
          <label
            for="username"
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
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="satoshi@gmail.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required=""
          />
        </div>
        <div>
          <label
            for="phone"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Nomor Handphone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="+62766372236"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required=""
          />
        </div>

        <div>
          <label
            for="password"
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
            className="flex justify-center items-center w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-400"
          >
            <span className="loading loading-spinner loading-sm"></span>
          </button>
        ) : (
          <button
            type="submit"
            className="flex justify-center items-center w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-500"
          >
            Daftar
          </button>
        )}
        <p className="text-sm font-light text-gray-700">
          Sudah memiliki akun ?{" "}
          <Link href="/login" className="font-medium text-red-500">
            Masuk disini
          </Link>
        </p>
      </form>
    </>
  );
}
