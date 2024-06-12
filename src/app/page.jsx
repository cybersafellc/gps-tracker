import Link from "next/link";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Footer from "./components/Footer";

export default function Main() {
  return (
    <>
      <Navbar />
      <Section>
        <Container>
          <div className="roboto-light text-black grid grid-cols-1 md:grid-cols-2 ">
            <div className="md:pt-40 pt-20">
              <h1 className="text-2xl md:text-3xl xl:text-4xl">
                Lacak Keberadaan Teman atau keluarga anda hanya dengan URL
              </h1>
              <p className="pt-2">
                Kami merupakan salah satu platform terbaik yang menyediakan
                layanan pelacakan melalui GPS hanya dengan menggunakan URL,
                tanpa perlu setup yang rumit.
              </p>
              <div className="pt-5 flex gap-4">
                <Link
                  href="/dashboard"
                  className="btn text-white bg-cyan-800 border-cyan-800 hover:bg-cyan-900 hover:border-cyan-900 "
                >
                  Coba Sekarang
                </Link>
                <Link
                  href="https://github.com/cybersafellc/gps-tracking-api-migrate"
                  className="btn bg-white text-black hover:bg-black hover:text-white hidden sm:flex"
                >
                  Butuh Penggunaan API?
                </Link>
              </div>
            </div>
            <div className="md:flex justify-center items-center h-full md:pt-20 hidden">
              <div className="w-full">
                <img
                  src="https://th.bing.com/th/id/R.1c9aa1e3d27e07ed62099858c84ffa59?rik=7HSc9GHdP0s%2fIA&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f3%2fWorld-Map-PNG-Photos.png&ehk=ndT%2fnL7BbFDu74yQPRO7Nl2KHP0fXbF%2bfncPMlx8EcQ%3d&risl=&pid=ImgRaw&r=0"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </Container>
        <Container className="mt-20 pb-10">
          <div>
            <h3 className="text-2xl text-black uppercase text-center">Fitur</h3>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              className="text-black block rounded-xl border border-1 p-8 shadow-xl transition hover:border-cyan-700 hover:shadow-cyan-500/10"
              href="#"
            >
              <h2 className="mt-4 text-xl font-bold text-black">
                Pelacakan Real-Time
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Pantau aktivitas secara langsung dengan pembaruan waktu nyata,
                memberikan visibilitas terhadap pergerakan dan peristiwa secara
                instan.
              </p>
            </a>
            <a
              className="text-black block rounded-xl border border-1 p-8 shadow-xl transition hover:border-cyan-700 hover:shadow-cyan-500/10"
              href="#"
            >
              <h2 className="mt-4 text-xl font-bold text-black">Setup Mudah</h2>

              <p className="mt-1 text-sm text-gray-500">
                Mulai memanfaatkan sistem hanya dengan satu klik. URL yang sudah
                siap akan langsung dapat digunakan tanpa perlu konfigurasi
                rumit.
              </p>
            </a>
            <a
              className="text-black block rounded-xl border border-1 p-8 shadow-xl transition hover:border-cyan-700 hover:shadow-cyan-500/10"
              href="#"
            >
              <h2 className="mt-4 text-xl font-bold text-black">
                Laporan Terperinci
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Dapatkan laporan terperinci yang menyajikan informasi yang
                relevan dan terstruktur, memungkinkan evaluasi kinerja dan
                pemahaman yang mendalam tentang setiap aspek dari sistem
                pelacakan.
              </p>
            </a>
          </div>
        </Container>
      </Section>
      <Footer />
    </>
  );
}
