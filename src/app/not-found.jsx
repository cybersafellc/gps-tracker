import Link from "next/link";

export default function NotFound({ searchParams }) {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>
        <p className="mt-4 text-gray-500">We can't find that page.</p>
        <Link
          href={`/`}
          className="mt-6 inline-block rounded bg-cyan-800 px-5 py-3 text-sm font-medium text-white hover:bg-cyan-900 focus:outline-none focus:ring-red-500"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
