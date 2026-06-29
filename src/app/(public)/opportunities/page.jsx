import Opportunities from "@/components/opportunities/Opportunities";
import axios from "axios";


export default async function OpportunitiesPage () {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const response = await axios.get(`${baseURL}/api/all_opportunities`);
  const opportunities = response.data.data;
  return (
    <Opportunities opportunities = {opportunities}/>
  );
}