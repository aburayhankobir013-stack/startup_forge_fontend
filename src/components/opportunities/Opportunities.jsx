
import OpportunityCard from "../featuredOpportunities/OpportunityCard";




export default async function Opportunities ({opportunities}) {
  
  
  return (
    <div className="h-screen overflow-y-auto  bg-linear-to-l from-orange-200 via-orange-100 to-orange-50">
      {/* Wrapper */}
      <div className="container mx-auto p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">All Opportunities</h1>
        <p className="text-xl font-bold">Total number of opportunities {opportunities.length}</p>
      </div>
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