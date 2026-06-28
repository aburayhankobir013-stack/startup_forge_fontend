import FounderManageOpportunities from "@/components/founderManageOpportunities/FounderManageOpportunities";
import { auth } from "@/lib/auth";
import axios from "axios";
import { headers } from "next/headers";




export default async function FounderManageOpportunitiesPage () {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const founder_email = session?.user?.email;
  const response = await axios.get(`${baseURL}/api/founder/manage_opportunities?founder_email=${founder_email}`);
  if (!response.data.success) {
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