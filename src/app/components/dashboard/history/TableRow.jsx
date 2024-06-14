import Link from "next/link";

export default function TableRow(props) {
  return (
    <>
      <tr className="odd:bg-gray-50" key={props.key}>
        <td className="whitespace-nowrap px-4 py-2  text-gray-700">
          {props.lat}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex justify-start">
          {props.long}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          <div className="flex justify-start">{props.accuracy}</div>
        </td>
        <td className="whitespace-nowrap  px-4 py-2 text-gray-700">
          {props.date}
        </td>
        <td className="whitespace-nowrap px-4 flex justify-center gap-2 py-2 text-gray-700">
          <Link
            href={`https://www.google.com/maps?q=${props.lat},${props.long}`}
            className="underline"
          >
            <span className="whitespace-nowrap rounded-full bg-blue-100 px-2.5 py-0.5 text-sm text-blue-700">
              View Location (Google Maps)
            </span>
          </Link>
        </td>
      </tr>
    </>
  );
}
