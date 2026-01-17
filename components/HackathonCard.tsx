type Hackathon = {
  id: number;
  name: string;
  location?: string;
  prize?: string;
  participants?: string;
  start_date?: string | null;
  end_date?: string | null;
  platform?: string;
  link?: string;
};

type HackathonCardProps = {
  hackathon: Hackathon;
};

const HackathonCard = ({ hackathon }: HackathonCardProps) => {
  const isOnline = hackathon.location?.toLowerCase() === "online";

  return (
    <div className="group relative bg-white p-4 ring-1 ring-black/10 transition">
      <div className="pl-3">
        <h3 className="text-sm font-[Header] py-2 font-semibold text-gray-900 line-clamp-2">
          {hackathon.name}
        </h3>

        <p className="mt-1 flex items-center gap-2 text-xs text-gray-500">
          <span className="truncate">{hackathon.platform}</span>

          <span className="rounded-full px-2 py-0.5 text-[10px] font-medium text-gray-700">
            {isOnline ? (
              <span className="bg-green-500 text-white p-1 rounded">
                Online
              </span>
            ) : (
              <span className="bg-red-500 p-1 text-white rounded">
                Offline
              </span>
            )}
          </span>
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 pl-3 text-sm">
        <div>
          <p className="text-xs text-gray-500">Prize</p>
          <p className="font-medium text-gray-900">{hackathon.prize}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Participants</p>
          <p className="font-medium text-black">
            {Number(hackathon.participants).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between pl-3">
        <p className="text-xs text-gray-500">
          Date : {hackathon.start_date ?? "N/A"} {hackathon.end_date}
        </p>

        <a
          href={hackathon.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-blue-600 rounded px-4 py-1 text-white transition hover:bg-blue-700"
        >
          View
        </a>
      </div>
    </div>
  );
};

export default HackathonCard;
