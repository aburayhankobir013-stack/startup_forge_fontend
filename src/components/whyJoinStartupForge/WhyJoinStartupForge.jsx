import { FaUsers, FaRocket, FaShieldAlt, FaChartLine } from "react-icons/fa";
import WhyJoinStartupForgeCard from "./WhyJoinStartupForgeCard";

const whyJoinData = [
  {
    icon: FaUsers,
    title: "Smart Team Matching",
    description: "Connect with the right people based on skills and interests."
  },
  {
    icon: FaRocket,
    title: "Fast startup Building",
    description: "Build your startup team quickly and efficiently."
  },
  {
    icon: FaShieldAlt,
    title: "Trasted Platform",
    description: "Work with verified users in a safe environment."
  },
  {
    icon: FaChartLine,
    title: "Track Progress",
    description: "Easily manage and track all applications."
  },
];


export default function WhyJoinStartupForge () {
  return (
    <div className="bg-linear-to-l from-orange-200 via-orange-100 to-orange-50">
      {/* Wrapper */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {/* Main container */}
        {whyJoinData.map((data,index) => <WhyJoinStartupForgeCard key={index} data = {data}/>)}
      </div>
    </div>
  );
}