import FounderManageOpportunityCard from "./FounderManageOpportunityCard";



export default function FounderManageOpportunities ({opportunityData}) {
  const { relatedStartup } = opportunityData;
  const { opportunities } = opportunityData;
  return (
    <div className="h-full p-4 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          opportunities.map((opportunity) => (
            <FounderManageOpportunityCard key={opportunity._id} opportunity = {opportunity} relatedStartup={relatedStartup}/>
          ))
        }
      </div>
    </div>
  );
}