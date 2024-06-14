"use client";
import React, { useEffect } from "react";
import { Dialog } from "@material-tailwind/react";

export default function ModalsContainer({ children, view }) {
  return (
    <>
      <Dialog open={view} className="max-w-96 shadow-xl">
        {children}
      </Dialog>
    </>
  );
}
