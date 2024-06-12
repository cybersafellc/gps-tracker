import Section from "./Section";

export default function LoadinPage() {
  return (
    <>
      <Section className="flex justify-center items-center">
        <div className="h-screen w-full flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </Section>
    </>
  );
}
