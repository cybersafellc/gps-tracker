import Link from "next/link";

export default function Form() {
  return (
    <>
      <form className="space-y-4 md:space-y-6" action="#">
        <div>
          <label
            for="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Nama
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Satoshi Nakamoto"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required=""
          />
        </div>
        <div>
          <label
            for="username"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="satoshi2334"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required=""
          />
        </div>
        <div>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="satoshi@gmail.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required=""
          />
        </div>
        <div>
          <label
            for="phone"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Nomor Handphone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="+62766372236"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required=""
          />
        </div>

        <div>
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required=""
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-500"
        >
          Daftar
        </button>
        <p className="text-sm font-light text-gray-700">
          Sudah memiliki akun ?{" "}
          <Link href="/login" className="font-medium text-red-500">
            Masuk disini
          </Link>
        </p>
      </form>
    </>
  );
}
