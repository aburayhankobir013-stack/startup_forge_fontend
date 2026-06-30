import CollaboratorMyApplication from "@/components/collaboratorMyApplication/CollaboratorMyApplication";
import { auth } from "@/lib/auth";
import axios from "axios";
import { headers } from "next/headers";



export default async function CollaboratorMyApplicationPage () {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const applicantEmail = session?.user?.email;
  const response = await axios.get(`${baseURL}/api/collaborator/my_applications?applicantEmail=${applicantEmail}`);
  const applications = response.data.data;
  return (
    <CollaboratorMyApplication applications = {applications} />
  );
}