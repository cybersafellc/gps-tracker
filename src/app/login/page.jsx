import Link from "next/link";
import Section from "../components/Section";
import Form from "../components/login/Form";

export default function Login() {
  return (
    <>
      <Section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl  text-gray-900"
          >
            GPS TRACKER
          </a>
          <div className="w-full bg-white rounded-lg md:shadow md:border md:mt-0 sm:max-w-md md:p-3">
            <div className="py-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl  leading-tight tracking-tight text-gray-900 md:text-2xl">
                Masuk
              </h1>
              <Form />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
