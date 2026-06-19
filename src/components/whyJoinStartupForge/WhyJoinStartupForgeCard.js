import { FaUsers, FaRocket, FaShieldAlt, FaChartLine } from "react-icons/fa";


export default function WhyJoinStartupForgeCard ({data}) {
  const {icon: Icon, title, description} = data;
  return (
    <div className="flex flex-col items-center text-center p-4 gap-2 shadow-sm bg-orange-300 rounded-sm hover:shadow-orange-500 cursor-pointer">
      <Icon size={20}/>
      <h3 className="font-bold">{title}</h3>
      <p className="font-semibold">{description}</p>
    </div>
  );
}