import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Hackathon = {
  id: string;
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
    <Card className="group hover:shadow-md transition-shadow duration-200 border-gray-100">
      <CardHeader className="flex flex-row items-center justify-between space-0 pb-2">
        <CardTitle className="text-sm font-[Header] font-semibold text-gray-900 line-clamp-1">
          {hackathon.name}
        </CardTitle>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
            isOnline ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
      </CardHeader>
      <div className="pt-0 pb-2">
        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <span className="truncate">{hackathon.platform}</span>{" "}
          {isOnline ? "· Online" : `· ${hackathon.location ?? "N/A"}`}
        </p>
      </div>
      <CardContent className="pt-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-500">Prize</p>
            <p className="font-medium text-gray-900">
              {hackathon.prize ?? "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Participants</p>
            <p className="font-medium text-black">
              {hackathon.participants ?? "N/A"}
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Date :{" "}
          {hackathon.start_date ?? "N/A"}{" "}
          {hackathon.end_date ? `– ${hackathon.end_date}` : ""}
        </p>
      </CardContent>
      <CardFooter className="pt-3">
        <a
          href={hackathon.link ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-sm bg-blue-600 text-white rounded-md px-4 py-2 text-center transition hover:bg-blue-700"
        >
          View
        </a>
      </CardFooter>
    </Card>
  );
};

export default HackathonCard;
