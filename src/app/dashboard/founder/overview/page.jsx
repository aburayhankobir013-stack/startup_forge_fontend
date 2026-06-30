import FounderOverview from "@/components/founderOverview/FounderOverview";
import { auth } from "@/lib/auth";
import axios from "axios";
import { headers } from "next/headers";

export default async function FounderOverviewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const founderEmail = session?.user?.email;
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const response = await axios.get(
    `${baseURL}/api/founder/overview?founderEmail=${founderEmail}`,
  );
  const overview = response.data.data;
  return <FounderOverview overview = {overview} />;
}
