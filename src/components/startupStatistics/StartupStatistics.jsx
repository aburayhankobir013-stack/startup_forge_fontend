import { FaUsers, FaRocket, FaHandshake, FaClipboardList } from "react-icons/fa";
import StartupSttisticCard from "./StartupStatisticCard";
const statisticsData = [
  {
    icon: FaUsers,
    value: "1200+",
    title: "Active Users",
  },
  {
    icon: FaRocket,
    value: "350+",
    title: "Startup Projects",
  },
  {
    icon: FaHandshake,
    value: "800+",
    title: "Successful Matches",
  },
  {
    icon: FaClipboardList,
    value: "5000+",
    title: "Applications Submitted",
  },
];

export default function StartupSttistics () {
  return (
    <div className="bg-linear-to-l from-orange-200 via-orange-100 to-orange-50">
      {/* Wrapper */}
      <h1 className="text-xl font-bold text-center">Startup Statistics</h1>
        <div className="container mx-auto grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Main container */}
          {statisticsData.map((data, index) => <StartupSttisticCard  key={index} data={data}/>)}
        </div>
    </div>
  );
}