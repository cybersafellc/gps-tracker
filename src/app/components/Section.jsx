export default function Section(props) {
  return (
    <>
      <section
        className={"bg-white min-h-screen mx-auto w-full" + props.className}
      >
        {props.children}
      </section>
    </>
  );
}
