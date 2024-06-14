import Link from "next/link";

export default function SideBarMenu({ children }) {
  return (
    <>
      <li>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-cyan-700  bg-cyan-800">
            <span className="text-sm font-medium flex items-center gap-1">
              <i className="bx bxs-dashboard"></i>
              Dashbord{" "}
            </span>

            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>
          <ul className="mt-2 space-y-1 px-4">
            <li>
              <Link
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium cursor-not-allowed flex items-center gap-1"
              >
                <i className="bx bx-laptop"></i>
                Live
              </Link>
            </li>
          </ul>
          <ul className="mt-2 space-y-1 px-4">
            <li>
              <Link
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium cursor-not-allowed flex items-center gap-1 text-white bg-cyan-800"
              >
                <i className="bx bx-history"></i>
                History
              </Link>
            </li>
          </ul>
          <ul className="mt-2 space-y-1 px-4">
            <li>
              <Link
                href="/dashboard/tambahkan"
                className="block rounded-lg px-4 py-2 text-sm font-medium hover:bg-cyan-700  hover:text-white flex items-center gap-1"
              >
                <i className="bx bx-plus"></i>
                Tambahkan
              </Link>
            </li>
          </ul>
        </details>
      </li>

      <li>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:bg-cyan-700 hover:bg-cyan-700  hover:text-white">
            <span className="text-sm font-medium flex items-center gap-1">
              <i className="bx bxs-user"></i> Account{" "}
            </span>

            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <ul className="mt-2 space-y-1 px-4">
            <li>{children}</li>
          </ul>
        </details>
      </li>
    </>
  );
}
