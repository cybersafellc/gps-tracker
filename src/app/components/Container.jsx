export default function Container(props) {
  return (
    <>
      <div className={"container w-100 mx-auto " + props.className}>
        {props.children}
      </div>
    </>
  );
}
