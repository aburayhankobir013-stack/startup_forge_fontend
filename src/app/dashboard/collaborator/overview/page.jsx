import CollaboratorOverview from "@/components/collaboratorOverview/CollaboratorOverview";
import { auth } from "@/lib/auth";
import axios from "axios";
import { headers } from "next/headers";

export default async function CollaboratorOverviewPage () {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const applicantEmail = session?.user?.email;
  const response = await axios.get(`${baseURL}/api/collaborator/overview?applicantEmail=${applicantEmail}`);
  const overview = response.data.data;
  return (
    <CollaboratorOverview overview = {overview}/>
  );
}