const messages = {
  current_expired: "Scanned perfectly!",
  not_generated: "This Ticket is not generated",
  alredy_expired: "This Ticket is already scanned",
  entry_date_expired: "This is not valid to this date",
};

import { type Message } from "../types";
import SelfAdvertisement from "./SelfAdvertisement";

interface Props {
  message: Message;
  handle: () => void;
}

const Alert = ({ message, handle }: Props) => {
  return (
    <div>
      <SelfAdvertisement />
      <div
        className={`p-5 max-w-[350px] w-[350px] rounded-lg border-2  ${
          message == "current_expired"
            ? "border-green-300 bg-green-100"
            : "border-red-300 bg-red-100"
        }`}
      >
        <p className="uppercase tracking-wider font-medium text-sm mb-1">
          ALEART
        </p>
        {message && (
          <h5 className="text-xl font-bold mb-2">{messages[message]}</h5>
        )}
        <button
          onClick={handle}
          className="px-10 py-3 bg-black text-white rounded-xl text-md  tracking-wider font-semibold w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Alert;
