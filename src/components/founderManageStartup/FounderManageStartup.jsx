"use client";
import { Avatar, Button } from "@heroui/react";
import {useOverlayState} from "@heroui/react";
import DeleteFounderStartup from "./DeleteFounderStartup";
import EditFounderStartup from "./EditFounderStartup";

export default function FounderManageStartup({ email, data }) {
  const deleteState = useOverlayState({
    defaultOpen: false,
  });
  const updateState = useOverlayState({
    defaultOpen: false,
  });
  const {
    _id,
    startup_name,
    industry,
    founding_stage,
    founder_email,
    imageUrl,
    description,
    status,
    createdAt,
  } = data;

  const dateFormate = (createdAt) => {
    const date = new Date(createdAt);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    const formatted = `${mm}-${dd}-${yy}`;
    return formatted;
  };
  return (
    <div className="h-full flex flex-col justify-center items-center p-2">
      {/* Wrapper */}
      <div className="p-4 w-full xs:max-w-md bg-orange-300 flex flex-col gap-4 rounded-sm shadow-sm shadow-orange-500">
        {/* Main container */}
        <div className="flex gap-4 justify-between">
          <div className="flex-none">
            <Avatar className="size-25 rounded-sm ring-2 ring-orange-500">
              <Avatar.Image alt={startup_name} src={imageUrl} />
            </Avatar>
          </div>
          <div className="w-full flex-1 flex flex-col gap-1 items-center">
            <h1 className="bg-orange-500 font-semibold text-white text-center px-2 py-1 rounded-sm w-full">
              {startup_name}
            </h1>
            <h2 className="bg-orange-500 font-semibold text-white text-center px-2 py-1 rounded-sm w-full">
              {founding_stage}
            </h2>
            <h2 className="bg-yellow-500 font-semibold text-white text-center px-2 py-1 rounded-sm w-full">
              {status}
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">{industry}</h1>
            <p className="italic text-xs">{founder_email}</p>
          </div>
          <p className="bg-orange-100 p-2 rounded-sm">{description}</p>
        </div>
        <div>
          <div className="bg-orange-500 px-2 py-1 rounded-sm font-semibold text-white">
            Created at: {dateFormate(createdAt)}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Button
          onPress={deleteState.open}
            variant="outline"
            className="rounded-sm bg-red-500 border-none text-white shadow-sm shadow-red-300 hover:bg-red-700 w-full"
          >
            Delete
          </Button>
          <Button
          onPress={updateState.open}
            variant="outline"
            className="rounded-sm bg-black border-none text-white hover:bg-white hover:text-black w-full"
          >
            Edit
          </Button>
        </div>
      </div>
      <DeleteFounderStartup deleteState = {deleteState} details = {{_id, imageUrl, startup_name}} />
      <EditFounderStartup updateState = {updateState} data = {data} />
    </div>
  );
}
