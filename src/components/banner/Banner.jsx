import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";



export default function Banner () {
  return (
    <div className="bg-linear-to-l from-orange-200 via-orange-100 to-orange-50">
      {/* Wrapper */}
      <div className="container mx-auto flex items-center flex-col-reverse gap-2 px-2 py-4 md:flex-row justify-center lg:gap-15 xl:gap-25 2xl:gap-40">
        {/* Main container */}
        <div className="flex flex-col items-center text-center gap-2">
          {/* Left sub container */}
          <div className="flex flex-col items-center text-center gap-2">
            {/* Textual content*/}
            <h1 className="text-2xl font-bold md:text-3xl">
              {/* Main heading */}
              <span>Forge Your Startup,</span>
              <br />
              <span className="text-orange-500">Build Your Future.</span> 
            </h1>
            <p className="font-semibold">
              {/* Sub heading */}
              A collaborative platform that brings founders and skilled <br className="hidden md:block" /> professionals together to build impactful startups.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* CTA buttons */}
            <Link href = {"#"}>
              <Button variant = "outline" className = "border-2 border-orange-500 rounded-sm font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-xs shadow-orange-300">
                Sign Up
              </Button>
            </Link>
            <Link href = {"#"}>
              <Button variant = "outline" className = "rounded-sm border-2 border-orange-500 hover:bg-orange-600 text-orange-500 font-bold shadow-xs shadow-orange-300 hover:text-white">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        <div>
          {/* Right sub container */}
          <figure className="relative size-75 md:size-100 xl:size-125">
            <Image src = {"/assets/banner.png"} alt="Banner image" priority fill />
          </figure>
        </div>
      </div>
    </div>
  );
}