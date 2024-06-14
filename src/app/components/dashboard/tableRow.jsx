import Link from "next/link";
import Delete from "./Delete";
import Copy from "./Copy";

export default async function TableRow(props) {
  return (
    <>
      <tr className="odd:bg-gray-50" key={props.key}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {props.device_name}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex justify-center">
          <Copy token={props.token} />
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          <div className="flex justify-center">{props.date}</div>
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {props.status ? (
            <div className="flex justify-center items-center gap-1">
              Online
              <div className="badge badge-success badge-xs"></div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-1">
              Offline
              <div className="badge badge-error badge-xs"></div>
            </div>
          )}
        </td>
        <td className="whitespace-nowrap px-4 flex justify-center gap-2 py-2 text-gray-700">
          <Link href={`/dashboard/live?id=${props.id}`} className="underline">
            <span className="whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-sm text-green-700">
              Live
            </span>
          </Link>
          <Link
            href={`/dashboard/history?tracking_id=${props.id}`}
            className="underline"
          >
            <span className="whitespace-nowrap rounded-full bg-blue-100 px-2.5 py-0.5 text-sm text-blue-700">
              History Tracker
            </span>
          </Link>
          <Delete device_name={props.device_name} tracking_id={props.id} />
        </td>
      </tr>
    </>
  );
}
