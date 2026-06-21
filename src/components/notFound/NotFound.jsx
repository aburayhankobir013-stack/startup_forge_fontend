"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="h-screen bg-black">
      {/* Wrapper */}
      <div className="h-full container mx-auto flex flex-col justify-center items-center">
        <div className="text-center flex flex-col gap-2">
          <h1 className="font-bold text-xl">
            <span className="text-indigo-500">STARTUP</span>
            <span className="text-orange-500">FORGE</span>
          </h1>
          <p className="text-red-500 text-2xl font-bold">404</p>
          <h2 className="text-red-500 text-xl">Page Not Found!</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="rounded-sm bg-orange-500 border-none shadow-sm hover:shadow-orange-300 text-white font-bold"
            >
              Go Back
            </Button>
            <Button
              variant="outline"
              
              onClick={() => router.push("/")}
              className="rounded-sm bg-orange-500 border-none shadow-sm hover:shadow-orange-300 text-white font-bold"
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
