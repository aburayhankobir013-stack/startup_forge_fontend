"use client";
import DashboardSidebarDesktop from "@/components/dashboard/DashboardSidebarDesktop";
import DashboardSidebarMobile from "@/components/dashboard/DashboardSidebarMobile";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";

export default function DashboardLayout({ children }) {
  const { data: session, isLoading } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between px-2 py-1 md:justify-center bg-orange-300">
        <div className="md:hidden">
          {/* Hamburger container */}
          {isOpen ? (
            <RxCross2
              size={20}
              className="cursor-pointer"
              onClick={() => setIsOpen((preValue) => !preValue)}
            />
          ) : (
            <RxHamburgerMenu
              size={20}
              className="cursor-pointer"
              onClick={() => setIsOpen((preValue) => !preValue)}
            />
          )}
        </div>
        <div>
          <h1 className="font-bold text-xl">
            Welcome to {session?.user?.role} dashboard
          </h1>
        </div>
      </div>
      <div className="h-full relative md:flex bg-linear-to-l from-orange-200 via-orange-100 to-orange-50">
        {isOpen && <DashboardSidebarMobile />}
        <DashboardSidebarDesktop />
        {children}
      </div>
    </div>
  );
}
