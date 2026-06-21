import { Spinner } from "@heroui/react";
export default function Loading () {
  return (
    <div className="h-screen bg-linear-to-l from-orange-200 via-orange-100 to-orange-50">
      {/* Wrapper */}
      <div className="h-full container mx-auto flex flex-col justify-center items-center">
        <Spinner color="current" />
      </div>  
    </div>
  );
}