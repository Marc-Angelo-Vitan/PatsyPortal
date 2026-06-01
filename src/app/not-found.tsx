"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      {/* <Image src={NotFoundGraphics} width="600" height="500" alt="" />
      <div className="text-brand font-bold">ERROR - PAGE NOT FOUND!</div> */}
      <div className="text-center">
      <p>we&apos;re sorry, the page you requested could not be found.</p><p> Please go back to the dashboard! </p>
      </div>
      {/* <Button label="Back to Dashboard" onClick={() => router.push("/dashboard")} /> */}
    </div>
  );
}