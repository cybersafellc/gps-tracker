import getHistorysSSR from "@/app/action/dashboard/history/getHistorys";
import Section from "@/app/components/Section";
import { notFound } from "next/navigation";
import Link from "next/link";
import PhoneSideBar from "@/app/components/PhoneSideBar";
import SideBar from "@/app/components/SideBars";

import TableRow from "@/app/components/dashboard/history/TableRow";
import { cookies } from "next/headers";
import Logout from "@/app/components/dashboard/Logout";
import SideBarMenu from "@/app/components/dashboard/history/SideBarMenu";

export default async function History({ searchParams }) {
  if (!searchParams.tracking_id) return notFound();
  const cookiesStore = cookies();
  const access_token = cookiesStore.get("access_token").value;
  const historys = await getHistorysSSR(searchParams.tracking_id, access_token);
  if (!historys) return notFound();
  return (
    <>
      <Section className="p-0">
        <PhoneSideBar className="md:hidden" />
        <SideBar className=" md:w-60 hidden z-10">
          <SideBarMenu>
            <Logout />
          </SideBarMenu>
        </SideBar>

        <div className="  md:ps-64 ps-20 pe-4 pt-4">
          <nav aria-label="Breadcrumb" className="flex">
            <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600">
              <li className="flex items-center">
                <Link
                  href="/dashboard"
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
                </Link>
              </li>

              <li className="relative flex items-center">
                <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>

                <a
                  href="#"
                  className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900"
                >
                  History
                </a>
              </li>
            </ol>
          </nav>
          <div className="overflow-x-auto pt-5">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Latitude
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Longtitude
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Accuracy
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Date
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {historys?.map(async (data, index) => {
                  return <TableRow {...data} key={index + 1} />;
                })}
              </tbody>
            </table>
          </div>
          {historys[0] ? (
            ""
          ) : (
            <div className="font-bold text-md md:text-2xl flex justify-center py-6">
              History Tracking Kosong
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
