"use client";

import { useState } from "react";
import Important from "../../Important";
import ModalsSuccess from "../../ModalsSuccess";
import clientTokenValidator from "@/app/action/clientTokenValidator";
import { useRouter } from "next/navigation";
import tambahkan from "@/app/action/dashboard/tambahkan/tambahkan";
import AlertError from "../../Error-Alert";

export default function MainContent({ className }) {
  const redirect = useRouter();

  const [viewAlertSuccess, setViewAlertSuccess] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const [errorView, setErrorView] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const tambahkans = async (e) => {
    e.preventDefault();
    const device_name = await e?.currentTarget?.name?.value;
    setLoadingButton(true);
    await clientTokenValidator(redirect);
    await tambahkan(device_name, (err, success) => {
      if (err) {
        setErrorMessage(err.message);
        setErrorView(true);
        setLoadingButton(false);
      } else {
        setViewAlertSuccess(true);
        setLoadingButton(false);
        setTimeout(() => {
          setViewAlertSuccess(false);
        }, 5000);
      }
    });
  };
  return (
    <>
      <ModalsSuccess
        view={viewAlertSuccess}
        title="Generate Berhasil"
        message="URL berhasil ditambahkan. Silahkan cek dashboard"
      >
        <button
          className="text-gray-500 transition hover:text-gray-600"
          onClick={() => setViewAlertSuccess(false)}
        >
          <span className="sr-only">Dismiss popup</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </ModalsSuccess>
      <div className="w-full py-8">
        <div className="max-w-xl text-lg">
          <div className="flex flex-col gap-2">
            <Important
              messasge="Kami tidak bertanggung jawab atas penyalahgunaan platform kami.
          Gunakan dengan bijak"
            />
            <AlertError view={errorView} message={errorMessage} />
          </div>
          <div className="rounded-lg bg-white p-0 border-0 md:p-6 shadow-0 md:shadow-lg lg:col-span-3 lg:p-8 mt-3">
            <form onSubmit={(e) => tambahkans(e)} className="space-y-4">
              <div>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm bg-gray-100 border border-1 "
                  placeholder="Device Name"
                  name="name"
                  type="text"
                  id="name"
                />
              </div>

              <div className="mt-4">
                {loadingButton ? (
                  <button
                    className="inline-block w-full rounded-lg bg-cyan-800 px-5 py-3 font-medium text-white  text-sm flex items-center justify-center gap-2 cursor-progress"
                    disabled
                  >
                    <span className="loading loading-spinner loading-xs"></span>{" "}
                    loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-cyan-800 hover:bg-cyan-900 px-5 py-3 font-medium text-white  text-sm flex items-center justify-center gap-2"
                  >
                    Generate
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
