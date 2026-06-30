"use client";
import { Avatar, Button, toast } from "@heroui/react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import NavLink from "./NavLink";
import { useState } from "react";
import Link from "next/link";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const router = useRouter();
  const { data: session, isLoading } = useSession();
  const role = session?.user?.role;
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

  return (
    <div className="bg-linear-to-l from-orange-200 via-orange-100 to-orange-50 sticky top-0 left-0 z-50 w-full">
      {/* Wrapper */}
      <div className="container mx-auto hidden md:flex items-center justify-between px-3 py-2 bg-orange-200 shadow-md relative">
        <div>
          <h1 className="text-xl font-bold">
            <span className="text-indigo-500">
              STARTUP<span className="text-orange-500">FORGE</span>
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <NavLink href={"/"}>Home</NavLink>
          <NavLink href={"/startups"}>Browse startups</NavLink>
          <NavLink href={"/opportunities"}>Browse opportunities</NavLink>
          {
            !session?.user
            &&
            <NavLink href={"/pricing"}>Pricing</NavLink>
          }
          {
            role === "founder"
            &&
            <NavLink href={"/pricing"}>Pricing</NavLink>
          }
        </div>
        <div>
          {session?.user ? (
            <Avatar
              className="cursor-pointer"
              onClick={() => setIsOpenDropdown((prevValue) => !prevValue)}
            >
              <Avatar.Image alt="John Doe" src={session?.user?.image} />
              <Avatar.Fallback>{session?.user?.name.charAt(0)}</Avatar.Fallback>
            </Avatar>
          ) : (
             <div className="flex items-center gap-2">
              <Link href={"/signin"}>
              <Button
                variant="outline"
                className="rounded-sm bg-orange-500 font-bold text-white shadow-sm hover:shadow-orange-500 border-none"
              >
                Sign In
              </Button>
            </Link>
            <Link href={"/signup"}>
              <Button variant="outline" className="rounded-sm bg-orange-500 font-bold text-white shadow-sm hover:shadow-orange-500 border-none">Sign Up</Button>
            </Link>
            </div>
          )}
        </div>
        {isOpenDropdown && session?.user && (
          <div className="max-w-100 w-full rounded-bl-sm rounded-br-sm p-1
           bg-orange-200 shadow-sm shadow-orange-300 absolute right-0 top-full text-center z-10">
            <div className="bg-gray-100 rounded-sm flex flex-col items-center gap-2 p-2">
            <h1 className="font-semibold">
              <span>Welcome</span>
              <br />
              <span className="text-xl">{session?.user?.name}</span>
            </h1>
            <p className="italic text-xs">{session?.user?.email}</p>
            <Link href={`/dashboard/${role}/overview`} className="font-semibold hover:border-b-2">
              Dashboard
            </Link>
            <Link href={"/profile"} className="font-semibold hover:border-b-2">
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

      <div className="container mx-auto shadow-sm flex items-center justify-between px-3 py-2 bg-orange-200 relative md:hidden">
        {/* Main container */}
        <div>
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
        <div className="hidden xs:block">
          {/* Logo container */}
          <h1 className="text-xl font-bold">
            <span className="text-indigo-500">
              STARTUP<span className="text-orange-500">FORGE</span>
            </span>
          </h1>
        </div>
        <div>
          {/* Avatar container */}
          {session?.user ? (
            <Avatar
              className="cursor-pointer"
              onClick={() => setIsOpenDropdown((prevValue) => !prevValue)}
            >
              <Avatar.Image alt="John Doe" src={session?.user?.image} />
              <Avatar.Fallback>{session?.user?.name.charAt(0)}</Avatar.Fallback>
            </Avatar>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={"/signin"}>
              <Button
                variant="outline"
                className="rounded-sm bg-orange-500 font-bold text-white shadow-sm hover:shadow-orange-500 border-none"
              >
                Sign In
              </Button>
            </Link>
            <Link href={"/signup"}>
              <Button variant="outline" className="rounded-sm bg-orange-500 font-bold text-white shadow-sm hover:shadow-orange-500 border-none">Sign Up</Button>
            </Link>
            </div>
          )}
        </div>
        {isOpenDropdown && session?.user && (
          <div className="max-w-100 w-full rounded-bl-sm rounded-br-sm p-1
           bg-orange-200 shadow-sm shadow-orange-300 absolute right-0 top-full text-center z-10">
            <div className="bg-gray-100 rounded-sm flex flex-col items-center gap-2 p-2">
            <h1 className="font-semibold">
              <span>Welcome</span>
              <br />
              <span className="text-xl">{session?.user?.name}</span>
            </h1>
            <p className="italic text-xs">{session?.user?.email}</p>
            <Link href={`/dashboard/${role}/overview`} className="font-semibold hover:border-b-2">
              Dashboard
            </Link>
            <Link href={"/profile"} className="font-semibold hover:border-b-2">
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
      {isOpen && (
        <div className="container mx-auto bg-orange-200 rounded-bl-sm rounded-br-sm p-1 md:hidden">
          <div className="flex flex-col items-center gap-1 p-2 rounded-sm bg-gray-100">
            <NavLink href={"/"}>Home</NavLink>
          <NavLink href={"/startups"}>Browse startups</NavLink>
          <NavLink href={"/opportunities"}>Browse opportunities</NavLink>
          {
            !session?.user
            &&
            <NavLink href={"/pricing"}>Pricing</NavLink>
          }
          {
            role === "founder"
            &&
            <NavLink href={"/pricing"}>Pricing</NavLink>
          }
          </div>
        </div>
      )}
    </div>
  );
}
