


export default function FounderOverview ({overview}) {
  const data = overview[0];
  const {
  totalOpportunities,
  totalApplications,
  acceptedApplications,
  rejectedApplications,
  pendingApplications,
} = data;
  const overviewCards = [
    {
      title: "Total opportunities",
      count: totalOpportunities,
    },
    {
      title: "Total Applications",
      count: totalApplications,
    },
    {
      title: "Total Accepted Members",
      count: acceptedApplications,
    },
    {
      title: "Total Rejected Members",
      count: rejectedApplications,
    },
    {
      title: "Total Pending Members",
      count: pendingApplications,
    }
  ];
  return (
    <div className="grid grid-cols-1 p-4 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {/* Wrapper */}
      {
        overviewCards.map((overviewCard, index) => (
          <div key={index} className="flex flex-col items-center text-center px-2 py-4 gap-4 bg-orange-300 rounded-sm shadow-sm hover:shadow-orange-500 hover:cursor-pointer">
            <h1 className="text-2xl font-bold">{overviewCard.title}</h1>
            <p className="text-2xl font-bold">{overviewCard.count}</p>
          </div>
        ))
      }
    </div>
  );
}