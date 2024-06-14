"use client";

import { useState } from "react";
import ModalsContainer from "../ModalsContainer";
import {
  Button,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const [view, setview] = useState(false);
  const redirect = useRouter();
  return (
    <>
      <ModalsContainer view={view}>
        <DialogHeader className="text-black">
          Kamu yakin mau keluar ?
        </DialogHeader>
        <DialogBody className="text-black">
          Apakah Kamu yakin untuk keluar. Jika iya klik Ya jika tidak klik
          Batalkan
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setview(false)}
            className="mr-1"
          >
            <span>Batalkan</span>
          </Button>
          <Button
            className="bg-cyan-800 hover:bg-cyan-900"
            onClick={() => redirect.push("/logout")}
          >
            <span>Ya</span>
          </Button>
        </DialogFooter>
      </ModalsContainer>
      <button
        onClick={() => setview(true)}
        className="w-full rounded-lg px-4 py-2 text-sm font-medium  [text-align:_inherit] hover:bg-cyan-700   hover:text-white flex items-center gap-1"
      >
        <i className="bx bx-log-out"></i>
        Logout
      </button>
    </>
  );
}
