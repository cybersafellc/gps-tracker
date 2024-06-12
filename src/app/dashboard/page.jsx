import Link from "next/link";
import PhoneSideBar from "../components/PhoneSideBar";
import Section from "../components/Section";
import SideBar from "../components/SideBars";
import SideBarMenu from "../components/dashboard/SidebarMenu";
import TableRow from "../components/dashboard/tableRow";
import { cookies } from "next/headers";
import getTracking from "../action/dashboard/getTrackings";
import { Suspense } from "react";

export default async function Dashbord() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token")?.value;
  const trackingsData = await getTracking(access_token);
  return (
    <>
      <Section className="p-0">
        <PhoneSideBar className="md:hidden" />
        <SideBar className=" md:w-60 hidden z-10">
          <SideBarMenu />
        </SideBar>

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
                {trackingsData?.map(async (data, index) => {
                  return <TableRow {...data} key={index + 1} />;
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <Link
              className="btn bg-cyan-800 hover:bg-cyan-900 text-white border-cyan-800 bg-cyan-800 hover:bg-cyan-900"
              href="/dashboard/tambahkan"
            >
              Tambahkan Url Baru
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
