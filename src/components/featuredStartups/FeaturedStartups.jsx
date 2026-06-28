import axios from "axios";
import FeaturedStartupCard from "./FeaturedStartuCard";



export default async function FeaturedStartups () {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const response = await axios.get(`${baseURL}/api/featured_startups`);
  const startups = response.data.data;
  return(
    <div className="bg-linear-to-l from-orange-200 via-orange-100 to-orange-50 flex flex-col items-center">
      {/* Wrapper */}
      <h1 className="font-bold text-xl">Popular Startups</h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 gap-4">
        {/* Main container */}
        {
          startups.map((startup) =>(
            <FeaturedStartupCard key={startup._id} startup = {startup} />
          ))
        }
      </div>
    </div>
  );
}