import Link from "next/link";
import PhoneSideBar from "../../components/PhoneSideBar";
import Section from "../../components/Section";
import SideBar from "../../components/SideBars";
import SideBarMenu from "../../components/dashboard/live/SidebarMenu";
import dynamic from "next/dynamic";
const MapComponent = dynamic(
  () => import("../../components/dashboard/live/MapsComponent"),
  {
    ssr: false,
  }
);
export default async function Live({ searchParams }) {
  return (
    <>
      <Section className="p-0">
        <PhoneSideBar className="md:hidden" />
        <SideBar className=" md:w-60 hidden z-10">
          <SideBarMenu />
        </SideBar>

        <div className="  md:ps-64 ps-20 pe-4 pt-4">
          <div className="flex justify-between">
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

                    <span className="ms-1.5 text-xs font-medium">
                      {" "}
                      Dashbord{" "}
                    </span>
                  </Link>
                </li>

                <li className="relative flex items-center">
                  <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>

                  <a
                    href="#"
                    className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900"
                  >
                    Live
                  </a>
                </li>
              </ol>
            </nav>
            <Link
              className="btn bg-cyan-800 border-cyan-800 text-white hover:bg-cyan-900 hover:border-cyan-900"
              href="/dashboard"
            >
              Kembali
            </Link>
          </div>
          <div className="overflow-x-auto pt-5">
            <div className="max-h-screen rounded-xl shadow overflow-hidden">
              <MapComponent tracking_id={searchParams.id} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
