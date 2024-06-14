"use client";

import { useEffect, useState } from "react";

export default function Copy({ token }) {
  const [domain, setDomain] = useState("");
  const [copied, setCopied] = useState(false);

  const copyTextToClipboard = async (text) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 5000);
      } catch (err) {
        alert("Gagal menyalin teks ke clipboard: ", err);
      }
    } else {
      alert("Clipboard API tidak didukung di browser ini.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.href.split("/")[2]);
    }
  }, []);

  return (
    <>
      {copied ? (
        <button disabled className="underline">
          <span className="whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-sm text-green-700">
            Copied<i className="bx bx-check"></i>
          </span>
        </button>
      ) : (
        <button
          onClick={() =>
            copyTextToClipboard(
              `${domain}/redirect/${token}?url=https://example.com`
            )
          }
          className="underline"
        >
          <span className="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-sm text-red-700">
            Copy URL <i className="bx bxs-copy"></i>
          </span>
        </button>
      )}
    </>
  );
}
