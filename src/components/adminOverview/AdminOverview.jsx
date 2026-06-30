



export default function AdminOverview ({overview}) {
  const {
    totalUsers,
    totalStartups,
    totalOpportunities,
    totalApplications,
  } = overview;
  const overviewCards = [
    {
      title: "Total Users",
      count: totalUsers,
    },
    {
      title: "Total Startups",
      count: totalStartups,
    },
    {
      title: "Total Opportunities",
      count: totalOpportunities,
    },
    {
      title: "Total Applications",
      count:  totalApplications,
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