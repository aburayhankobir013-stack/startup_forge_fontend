import axios from "axios";
import OpportunityCard from "./OpportunityCard";
import { Button } from "@heroui/react";
import { HiArrowRightCircle } from "react-icons/hi2";
import Link from "next/link";

export default async function FeaturedOpportunities() {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const response = await axios.get(`${baseURL}/api/featured_opportunities`);
  const opportunities = response.data.data;
  return (
    <div className="bg-linear-to-l from-orange-200 via-orange-100 to-orange-50">
      {/* Wrapper */}
      <div className="container mx-auto p-4 flex items-center justify-between">
        <h1 className="font-bold text-xl">Popular Opportunities</h1>
        <Button
          variant="outline"
          className="rounded-sm bg-orange-500 shadow-sm shadow-orange-500 hover:bg-orange-700 border-none"
        >
          <Link href={"/opportunities"} className="flex items-center gap-2">
            <span className="text-white font-bold">All opportunities</span>
            <HiArrowRightCircle className="text-white" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto p-4 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {/* Main container */}
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity._id} opportunity={opportunity} />
        ))}
      </div>
    </div>
  );
}
