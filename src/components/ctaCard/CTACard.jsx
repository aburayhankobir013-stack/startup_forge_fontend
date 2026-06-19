import { Button } from "@heroui/react";
import Link from "next/link";
import { RiArrowRightLongLine } from "react-icons/ri";
export default function CTACard () {
  return (
    <div className="bg-linear-to-l from-orange-200 via-orange-100 to-orange-50 p-4">
      {/* Wrapper */}
      <div className="container mx-auto flex flex-col items-center text-center gap-2 bg-orange-300 rounded-sm p-4">
        {/* Main container */}
        <h1 className="text-xl font-bold">Build Your Dream Startup Team Today</h1>
        <p className="font-semibold">
          Connect with talented founders, developers, designers, and innovators to turn your startup idea into reality.
        </p>
        <Link href = {"#"}>
          <Button variant="outline" className="rounded-sm font-bold bg-orange-500 shadow-sm hover:shadow-orange-500 text-white border-none">
            <span>Get Started</span>
            <RiArrowRightLongLine />
          </Button>
        </Link>
      </div>
    </div>
  );
}