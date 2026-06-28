import StartupDetails from "@/components/startupDetails/StartupDetails";
import axios from "axios";



export default async function StartupDetailsPage ({params}) {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const {startupId} = await params;
  const response = await axios.get(`${baseURL}/api/startup_details/${startupId}`);
  const startup = response.data.data;
  return (
    <div className="h-screen bg-linear-to-l from-orange-200 via-orange-100 to-orange-50">
      {/* Wrapper */}
      <div className="container mx-auto h-full flex flex-col justify-center items-center p-2">
        {/* Main container */}
        <StartupDetails startup={startup} />
      </div>
    </div>
  );
}