import Link from "next/link";
import Container from "../components/Container";
import PhoneSideBar from "../components/PhoneSideBar";
import Section from "../components/Section";
import SideBar from "../components/SideBars";

export default function Dashbord() {
  return (
    <>
      <Section className="p-0">
        <PhoneSideBar className="md:hidden" />
        <SideBar className=" md:w-60 hidden z-10" />

        <div className="  md:ps-64 ps-20 pe-4 pt-4">
          <nav aria-label="Breadcrumb" className="flex">
            <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600">
              <li className="flex items-center">
                <a
                  href="#"
                  className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>

                  <span className="ms-1.5 text-xs font-medium"> Dashbord </span>
                </a>
              </li>
            </ol>
          </nav>
          <div className="overflow-x-auto pt-5">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Device Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Url
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Date
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr className="odd:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    John Doe
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex justify-center">
                    <Link href="#" className="underline">
                      <span className="whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-sm text-green-700">
                        Go ro url
                      </span>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <div className="flex justify-center">24/05/1995</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <div className="flex justify-center">Offline</div>
                  </td>
                  <td className="whitespace-nowrap px-4 flex justify-center gap-2 py-2 text-gray-700">
                    <Link href="#" className="underline">
                      <span className="whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-sm text-green-700">
                        Live
                      </span>
                    </Link>
                    <Link href="#" className="underline">
                      <span className="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-sm text-red-700">
                        History Tracker
                      </span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <Link href="/tambahkan-url">tambahkan</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
