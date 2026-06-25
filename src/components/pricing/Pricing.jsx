"use client";
import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsLightningCharge } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { IoIosCheckmark } from "react-icons/io";



export default function Pricing () {
  const router = useRouter();
  const { data: session, isLoading } = useSession();
  const handleSubscription = async () => {
    if (!session?.user) {
      router.push("/signup");
    } else {
      console.log("Subscription!");
    }
  };
  return (
    <div className="h-screen relative md:flex bg-linear-to-l from-orange-200 via-orange-100 to-orange-50">
      {/* Wrapper */}
      <div className="container mx-auto h-full flex flex-col justify-center items-center gap-3 p-4">
        {/* Main container */}
        <div className="flex flex-col gap-2 text-center items-center">
          <h1 className="font-semibold text-xl">Choose the Right Plan for Your Startup Journey</h1>
          <p className="">Start for free with up to 3 opportunity postings. Upgrade <br className="hidden xs:block"/> anytime to unlock unlimited opportunities, advanced <br className="hidden xs:block" /> collaboration tools, and premium features.</p>
          <Button variant="outline" className="rounded-sm border-none bg-orange-500 font-bold text-white shadow-sm hover:shadow-orange-500 hover:bg-orange-700">
            <Link href={"/signup"} className="flex items-center gap-2">
              <span>Get started free</span>
              <HiOutlineArrowRight />
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-2 items-center text-center">
          <h1 className="font-bold text-2xl">Unlock <span className="text-indigo-500">Premium</span></h1>
          <p className="font-semibold">Post unlimited opportunities and build your dream team.</p>
        </div>
        <div className="bg-linear-to-r from-orange-200 via-orange-100 to-orange-50 rounded-sm p-4 flex flex-col gap-3 shadow-sm hover:shadow-orange-300">
          {/* Card container */}
          <div className="flex flex-col items-center text-center gap-2 cursor-pointer">
            <h1 className="flex items-center font-bold text-3xl">
              <FaDollarSign />
              <span>49<sub className="text-gray-400">.99</sub></span>
            </h1>
            <p className="text-gray-500">One-time payment, Lifetime access.</p>
          </div>
          <div>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-1">
                <IoIosCheckmark size={20} className="text-green-500"/><span className="text-xs text-gray-600">Unlimited opportunity postings</span>
              </li>
              <li className="flex items-center gap-1">
                <IoIosCheckmark size={20} className="text-green-500"/><span className="text-xs text-gray-600">Priority listing in search</span>
              </li>
              <li className="flex items-center gap-1">
                <IoIosCheckmark size={20} className="text-green-500"/><span className="text-xs text-gray-600">Premium badge on your startup</span>
              </li>
              <li className="flex items-center gap-1">
                <IoIosCheckmark size={20} className="text-green-500"/><span className="text-xs text-gray-600">Analytics dashboard access</span>
              </li>
              <li className="flex items-center gap-1">
                <IoIosCheckmark size={20} className="text-green-500"/><span className="text-xs text-gray-600">Advanced applicant filtering</span>
              </li>
              <li className="flex items-center gap-1">
                <IoIosCheckmark size={20} className="text-green-500"/><span className="text-xs text-gray-600">Email notifications for applications</span>
              </li>
            </ul>
          </div>
          <Button onClick={handleSubscription} className="border-none rounded-sm text-xs w-full bg-orange-500 shadow-sm hover:shadow-orange-500 hover:bg-orange-700">
            <BsLightningCharge />
            <span>Upgrade To Premium</span>
          </Button>
        </div>
      </div>
    </div>
  );
}