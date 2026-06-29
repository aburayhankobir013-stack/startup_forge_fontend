import FounderAllApplications from "@/components/founderAllApplications/FounderAllApplications";
import { auth } from "@/lib/auth";
import axios from "axios";
import { headers } from "next/headers";




export default async function FounderApplicationsPage () {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const response = await axios.get(`${baseURL}/api/founder/all_applications?founderEmail=${session?.user?.email}`);
  const applications = response.data.data;
  return (
    <FounderAllApplications applications = {applications} />
  );
}