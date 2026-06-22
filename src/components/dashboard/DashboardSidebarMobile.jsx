"use client";
import { GrOverview } from "react-icons/gr";
import { MdManageAccounts } from "react-icons/md";
import { FaRocket } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { authClient, useSession } from "@/lib/auth-client";
import { Avatar, Button, toast } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardSidebarMobile() {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { data: session, isLoading } = useSession();
  const router = useRouter();
  const role = session?.user?.role || "collaborator";
  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("User successfully signout!");
          router.push("/signin");
        },
      },
    });
  };
  const dashboardItems = {
    admin: [
      {
        icon: GrOverview,
        label: "Overview",
        href: "dashboard/admin/overview",
      },
      {
        icon: MdManageAccounts,
        label: "Manage Users",
        href: "dashboard/admin/manage_users",
      },
      {
        icon: FaRocket,
        label: "Manage Startups",
        href: "dashboard/admin/manage_startups",
      },
      {
        icon: FaExchangeAlt,
        label: "Transactions",
        href: "dashboard/admin/transactions",
      },
    ],
    founder: [
      {
        icon: GrOverview,
        label: "Overview",
        href: "dashboard/founder/overview",
      },
      {
        icon: FaRocket,
        label: "My Startup",
        href: "dashboard/founder/my_startup",
      },
      {
        icon: FaBriefcase,
        label: "Add Opportunity",
        href: "dashboard/founder/add_opportunity",
      },
      {
        icon: FaBriefcase,
        label: "Manage Opportunities",
        href: "dashboard/founder/manage_opportunities",
      },
      {
        icon: FaFileAlt,
        label: "Applications",
        href: "dashboard/founder/applications",
      },
    ],
    collaborator: [
      {
        icon: GrOverview,
        label: "Overview",
        href: "dashboard/collaborator/overview",
      },
      {
        icon: FaBriefcase,
        label: "My Application",
        href: "dashboard/collaborator/my_application",
      },
    ],
  };
  return (
    <div className="bg-orange-300 max-w-60 w-full h-full absolute p-4 flex flex-col justify-between md:hidden">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl text-center">
          <span className="text-indigo-500">STARTUP</span>
          <span className="text-orange-500">FORGE</span>
        </h1>
        {dashboardItems[role].map(({ icon: Icon, label, href }, index) => (
          <Button
            key={index}
            variant="outline"
            className="rounded-sm w-full shadow-sm bg-orange-500 font-bold text-white border-none hover:shadow-orange-500 hover:bg-orange-700"
          >
            <Icon />
            <Link href={href}>{label}</Link>
          </Button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="relative">
          <Avatar
            className="cursor-pointer"
            onClick={() => setIsOpenDropdown((prevValue) => !prevValue)}
          >
            <Avatar.Image
              alt={session?.user?.name}
              src={session?.user?.image}
            />
            <Avatar.Fallback>{session?.user?.name.charAt(0)}</Avatar.Fallback>
          </Avatar>
          {isOpenDropdown || (
            <div className="max-w-100 w-full rounded-sm p-1 gap-1 bg-orange-200 shadow-sm shadow-orange-300 absolute left-1/6 bottom-full text-center z-10">
              <div className="bg-gray-100 rounded-sm flex flex-col gap-2 items-center p-2">
                <h1 className="font-semibold">
                  <span>Welcome</span>
                  <br />
                  <span className="text-xl">{session?.user?.name}</span>
                </h1>
                <p className="italic text-xs">{session?.user?.email}</p>
                <Link href={"#"} className="font-semibold hover:border-b-2">
                  Profile
                </Link>
                <Button
                  variant="outline"
                  onClick={handleSignout}
                  className="rounded-sm border-none bg-orange-500 shadow-sm shadow-orange-500 text-white font-bold hover:bg-orange-600"
                >
                  Signout
                </Button>
              </div>
            </div>
          )}
        </div>
        <div>
          <Button
            variant="outline"
            className="w-full rounded-sm border-none bg-orange-500 font-bold text-white hover:bg-orange-700 shadow-sm hover:shadow-orange-500"
          >
            <Link href={"/"}>Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
