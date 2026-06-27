import FounderManageOpportunities from "@/components/founderManageOpportunities/FounderManageOpportunities";
import axios from "axios";




export default async function FounderManageOpportunitiesPage () {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

  const response = await axios.get(`${baseURL}/api/founder/manage_opportunities`);
  return (
    <FounderManageOpportunities opportunityData = {response.data.data}/>
  );
}