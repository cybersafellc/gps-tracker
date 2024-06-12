import Logo from "../../../public/logo.png";

export default function SideBar({ className, children }) {
  return (
    <>
      <div
        className={
          "md:flex h-screen flex-col justify-between border-e bg-white fixed left-0 top-0 bottom-0 bg-cyan-900 dark:bg-cyan-900 " +
          className
        }
      >
        <div className="px-4 py-6">
          <span className="grid h-10 w-32 place-content-center rounded-lg text-xl text-white">
            GPS Tracker
          </span>

          <ul className="mt-6 space-y-1">{children}</ul>
        </div>

        <div className="sticky inset-x-0 bottom-0  ">
          <a
            href="#"
            className="flex items-center gap-2 bg-cyan-800 text-white p-4 hover:bg-cyan-800 "
          >
            <img
              alt=""
              src="/user.jpg"
              className="size-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs ">
                <strong className="block font-medium">User</strong>

                <span> ****@****.com </span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
