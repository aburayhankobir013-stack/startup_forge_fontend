import FounderManageOpportunities from "@/components/founderManageOpportunities/FounderManageOpportunities";
import axios from "axios";




export default async function FounderManageOpportunitiesPage () {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

  const response = await axios.get(`${baseURL}/api/founder/manage_opportunities`);
  if (response.data.data.length === 0) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-red-500 text-xl">No opportunity created!</h1>
      </div>
    );
  }
  return (
    <FounderManageOpportunities opportunityData = {response.data.data}/>
  );
}