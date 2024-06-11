import Link from "next/link";
import Container from "../components/Container";
import Section from "../components/Section";
import Form from "../components/signup/Form";

export default function Signup() {
  return (
    <>
      <Section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            GPS TRACKER
          </a>
          <div className="w-full bg-white md:rounded-lg mmd:shadow md:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="py-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Daftar Akun Kamu
              </h1>
              <Form />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
