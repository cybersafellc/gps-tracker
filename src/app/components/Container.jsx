export default function Container(props) {
  return (
    <>
      <div
        className={"container w-100 mx-auto px-4 md:px-0 " + props.className}
      >
        {props.children}
      </div>
    </>
  );
}
