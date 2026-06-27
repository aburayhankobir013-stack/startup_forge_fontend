import FounderManageStartup from "@/components/founderManageStartup/FounderManageStartup";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import axios from "axios";




export default async function FounderManageStartupPage () {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const email = session?.user?.email;
  const response = await axios.get(
      `${baseURL}/api/founder/my_startup?founder_email=${email}`,
    );
  if (!response.data.data)  {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-red-500 text-xl">Start Not Created!</h1>
      </div>
    );
  }
  return (
    <FounderManageStartup email={email} data={response.data.data}/>
  );
}