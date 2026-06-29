"use client";
import { Avatar, Button, useOverlayState } from "@heroui/react";
import ApplyOpportunity from "../applyOpportunity/ApplyOpportunity";

export default function OpportunityDetails({ opportunity, session }) {
  const applyState = useOverlayState({
      defaultOpen: false,
    });
  const {
    _id,
    deadline,
    imageUrl,
    industry,
    role_title,
    startup_name,
    work_type,
    commitment_levels,
  } = opportunity;
  const getRemainingDays = (futureDate) => {
    const today = new Date();
    const deadline = new Date(futureDate);
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);
    const diffInMs = deadline - today;
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return Math.max(0, diffInDays);
  };
  const dateFormate = (createdAt) => {
    const date = new Date(createdAt);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    const formatted = `${mm}-${dd}-${yy}`;
    return formatted;
  };
  return (
    <div className="h-screen bg-linear-to-l from-orange-200 via-orange-100 to-orange-50">
      {/* Warpper */}
      <div className="container mx-auto h-full flex flex-col justify-center items-center p-2 md:max-w-lg">
        {/* Main container */}
        <div className="p-2 flex flex-col gap-2 bg-orange-300 rounded-sm shadow-sm shadow-orange-500 w-full">
          <div className="flex justify-between items-center gap-2">
            <div className="flex-none">
              <Avatar className="size-20 rounded-full">
                <Avatar.Image alt={startup_name} src={imageUrl} />
              </Avatar>
            </div>
            <div className="flex-1 text-center flex flex-col gap-1">
              <h1 className="bg-orange-500 rounded-sm px-2 py-1 font-semibold text-white">
                {startup_name}
              </h1>
              <h1 className="bg-orange-500 rounded-sm px-2 py-1 font-semibold text-white">
                {industry}
              </h1>
              <h1 className="bg-orange-500 rounded-sm px-2 py-1 font-semibold text-white">
                {commitment_levels}
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="flex-1 font-bold">{role_title}</h1>
            <h1 className="text-center bg-orange-500 px-2 py-1 rounded-sm font-semibold text-white">
              {work_type}
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-center font-semibold">Required Skills</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-200 gap-2 p-2 rounded-sm">
              {opportunity.required_skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-orange-300 text-center px-1 py-1 rounded-sm uppercase font-semibold"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-orange-500 px-2 py-1 rounded-sm font-semibold text-center text-white">
              Deadline: {dateFormate(deadline)}
            </div>
            <div className="bg-orange-500 px-2 py-1 rounded-sm font-semibold text-center text-white">
              Remaining days: {getRemainingDays(deadline)}
            </div>
            {session?.user?.role === "collaborator" && (
              <Button
                onPress={applyState.open}
                variant="outline"
                className="w-full rounded-sm font-bold text-white bg-orange-500 border-none shadow-sm shadow-orange-500 hover:bg-orange-700"
              >
                Apply now
              </Button>
            )}
          </div>
        </div>
      </div>
      <ApplyOpportunity applyState={applyState} opportunity = {opportunity} session = {session} />
    </div>
  );
}
