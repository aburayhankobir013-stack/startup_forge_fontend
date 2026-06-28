import axios from "axios";
import StartupCard from "./StartupCard";



export default async function Startups () {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

  const response = await axios.get(`${baseURL}/api/all_startups`);
  const all_startups = response.data.data;
  return (
    <div className="bg-linear-to-l from-orange-200 via-orange-100 to-orange-50 h-screen overflow-y-auto">
      {/* Wrapper */}
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">All Startups</h1>
        <h2 className="text-xl font-bold">Total number of startups {all_startups.length}</h2>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 gap-4">
        {/* Main container */}
        {
          all_startups.map((startup) => (
            <StartupCard key={startup._id} startup = {startup}/>
          ))
        }
      </div>
    </div>
  );
}