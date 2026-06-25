import { auth } from "@/lib/auth";
import { Avatar } from "@heroui/react";
import { headers } from "next/headers";

export default async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  return (
    <div className="h-screen bg-linear-to-l from-orange-200 via-orange-100 to-orange-5 flex flex-col justify-center items-center">
      {/* Wrapper */}
      <div className="flex flex-col gap-5">
        {/* Main container */}
        <div className="text-center flex flex-col gap-3">
          {/* Heading and Sub heading */}
          <h1 className="text-2xl font-bold">Build Your Professional Identity</h1>
          <p className="font-semibold">
            Showcase your skills, experience, and achievements to connect with
            <br />
            startups and opportunities.
          </p>
        </div>
        <div className="p-2 w-full xs:max-w-md rounded-sm bg-orange-300 shadow-sm hover:shadow-orange-500 flex flex-col gap-2">
          {/* Card container */}
          <div className="flex flex-col items-center text-center gap-2 p-2 rounded-sm bg-gray-100">
            <Avatar className="size-25 rounded-full ring-2 ring-blue-500"
            >
              <Avatar.Image alt={session?.user?.name} src={session?.user?.image} />
              <Avatar.Fallback>{session?.user?.name.charAt(0)}</Avatar.Fallback>
            </Avatar>
            <p className="font-semibold">Hello, {session?.user?.name}. Your are {session?.user?.role}.</p>
          </div>
          <div className="bg-gray-100 rounded-sm p-2 text-center flex flex-col gap-2">
            <h1 className="font-bold text-xl">{session?.user?.name}</h1>
            <p className="italic">{session?.user?.email}</p>
          </div>
          <div>
            {
              !session?.user?.isBlocked
              ?
              <div className="bg-green-300 text-center font-bold text-green-900 rounded-sm px-2 py-1">Active</div>
              :
              <div className="bg-red-400 text-center font-bold text-red-900 rounded-sm px-2 py-1">Blocked</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
