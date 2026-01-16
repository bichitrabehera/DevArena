const HackathonCard = ({ hackathon }) => {
  const isOnline = hackathon.location?.toLowerCase() === "online";

  return (
    <div className="group relative rounded-xl bg-white p-4 ring-1 ring-black/5 transition">
      
     

      {/* HEADER */}
      <div className="pl-3">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
          {hackathon.name}
        </h3>

        <p className="mt-1 flex items-center gap-2 text-xs text-gray-500">
          <span className="truncate">{hackathon.platform}</span>

          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700">
            {isOnline ? "Online" : "Offline"}
          </span>
        </p>
      </div>

      {/* STATS */}
      <div className="mt-4 grid grid-cols-2 gap-3 pl-3 text-sm">
        <div>
          <p className="text-xs text-gray-500">Prize</p>
          <p className="font-medium text-gray-900">{hackathon.prize}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Participants</p>
          <p className="font-medium text-gray-900">
            {Number(hackathon.participants).toLocaleString()}
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-4 flex items-center justify-between pl-3">
        <p className="text-xs text-gray-500">
          {hackathon.start_date ?? "TBA"} – {hackathon.end_date ?? "TBA"}
        </p>

        <a
          href={hackathon.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-blue-600 px-4 py-1 rounded text-white transition hover:bg-blue-700"
        >
          View
        </a>
      </div>
    </div>
  );
};

export default HackathonCard;
