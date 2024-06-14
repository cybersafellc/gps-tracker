"use client";

import Link from "next/link";
import ModalsContainer from "../ModalsContainer";
import {
  Button,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import clientTokenValidator from "@/app/action/clientTokenValidator";
import { useRouter } from "next/navigation";
import deletes from "@/app/action/dashboard/delete";
import AlertSuccess from "../Success-Alert";
import AlertError from "../Error-Alert";

export default function Delete({ device_name, tracking_id }) {
  const redirect = useRouter();
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await clientTokenValidator(redirect);
    await deletes(tracking_id, (err, successMessage) => {
      if (err) {
        console.log(err);
        setView(false);
        setLoading(false);
        setAlertError(true);
        setTimeout(() => {
          setAlertError(false);
        }, 5000);
      } else {
        console.log(successMessage);
        setView(false);
        setLoading(false);
        setAlertSuccess(true);
        setTimeout(() => {
          setAlertSuccess(false);
          window.location.reload();
        }, 5000);
      }
    });
  };
  return (
    <>
      <AlertSuccess
        className="absolute top-10 right-10"
        title={"Berhasil menghapus "}
        view={alertSuccess}
        details={device_name + " Berhasil Dihapus"}
      />
      <AlertError
        className={"absolute top-10 right-10"}
        message={"Waduh, Gagal menghapus " + device_name}
        view={alertError}
      />

      <ModalsContainer view={view}>
        <DialogHeader className="text-black">
          Kamu yakin Menghapus ?
        </DialogHeader>
        <DialogBody className="text-black">
          Apakah Kamu yakin untuk Menghapus "{device_name}". Jika iya klik Ya
          jika tidak klik Batalkan
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setView(false)}
            className="mr-1"
          >
            <span>Batalkan</span>
          </Button>
          {loading ? (
            <Button
              className="bg-cyan-800 hover:bg-cyan-900 py-3 flex cursor-progress"
              disabled
            >
              <span className="loading loading-spinner loading-xs"></span>
            </Button>
          ) : (
            <Button
              className="bg-cyan-800 hover:bg-cyan-900 "
              onClick={handleDelete}
            >
              <span>Ya</span>
            </Button>
          )}
        </DialogFooter>
      </ModalsContainer>
      <button className="underline" onClick={() => setView(true)}>
        <span className="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-sm text-red-700">
          Delete
        </span>
      </button>
    </>
  );
}
