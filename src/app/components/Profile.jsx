export default function Profile({ src }) {
  return (
    <>
      <div className="avatar online">
        <div className="w-10 rounded-full">
          <img src={src} />
        </div>
      </div>
    </>
  );
}
