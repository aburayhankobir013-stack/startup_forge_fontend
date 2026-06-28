import axios from "axios";
import OpportunityCard from "./OpportunityCard";




export default async function FeaturedOpportunities () {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const response = await axios.get(`${baseURL}/api/featured_opportunities`);
  const opportunities = response.data.data;
  return (
    <div className="bg-linear-to-l from-orange-200 via-orange-100 to-orange-50">
      {/* Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto p-4 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {/* Main container */}
        {
          opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity._id} opportunity = {opportunity} />
          ))
        }
      </div>
    </div>
  );
}