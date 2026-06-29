import OpportunityDetails from "@/components/opportunityDetails/OpportunityDetails";
import { auth } from "@/lib/auth";
import axios from "axios";
import { headers } from "next/headers";




export default async function OpportunityDetailsPage ({params}) {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const {opportunityId} = await params;
  const response = await axios.get(`${baseURL}/api/opportunity_details/${opportunityId}`);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const opportunity = response.data.data[0];
  return (
    <OpportunityDetails opportunity = {opportunity} session = {session}/>
  );
}