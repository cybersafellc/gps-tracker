import Link from "next/link";
import Container from "./Container";
import { cookies } from "next/headers";
import Profile from "./Profile";

export default async function Navbar(props) {
  const cookiesStore = cookies();
  const refresh_token = cookiesStore.get("refresh_token");
  return (
    <>
      <nav className="bg-white w-100 mx-auto roboto-light">
        <Container className="px-4 md:px-0">
          <div className="navbar text-black mx-auto w-full px-0 flex items-center">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Parent</a>
                    <ul className="p-2">
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a>Item 3</a>
                  </li>
                </ul>
              </div>
              <a className="px-2 text-md md:text-lg font-bold">GPS Tracker</a>
            </div>
            <div className="navbar-center hidden lg:flex">
              <div>
                <div className="sm:hidden">
                  <label htmlFor="Tab" className="sr-only">
                    Tab
                  </label>

                  <select
                    id="Tab"
                    className="w-full rounded-md border-gray-200"
                  >
                    <option>Settings</option>
                    <option>Messages</option>
                    <option>Archive</option>
                    <option select>Notifications</option>
                  </select>
                </div>

                <div className="hidden sm:block">
                  <div className="flex gap-6" aria-label="Tabs">
                    <Link
                      href="https://github.com/cybersafellc/gps-tracker"
                      className="shrink-0 rounded-lg p-2 text-sm font-medium text-black hover:bg-gray-50 hover:text-gray-700"
                    >
                      Source Code
                    </Link>
                    <Link
                      href="https://github.com/cybersafellc/gps-tracking-api-migrate"
                      className="shrink-0 rounded-lg p-2 text-sm font-medium text-black hover:bg-gray-50 hover:text-gray-700"
                    >
                      API
                    </Link>

                    <Link
                      href="#"
                      className="shrink-0 rounded-lg p-2 text-sm font-medium text-black hover:bg-gray-50 hover:text-gray-700"
                    >
                      About Us
                    </Link>

                    <Link
                      href="#"
                      className="shrink-0 rounded-lg  p-2 text-sm font-medium text-black hover:bg-gray-50 hover:text-gray-700"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="navbar-end">
              {refresh_token ? (
                <Profile src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              ) : (
                <Link
                  href="/signup"
                  className="btn hidden md:flex bg-cyan-800 border-cyan-800 border-1 text-white  hover:border-cyan-800 hover:bg-white hover:text-cyan-800 text-sm"
                >
                  Daftar Sekarang
                </Link>
              )}
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}
