"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Colors } from "../styles/colors";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-2xl w-full text-center">
        {/* Custom Image */}
        <div className="mb-8">
          {/* <Image
            src="/images/404-illustration.png" // Add your 404 image to public/images/
            alt="404 Page Not Found"
            width={400}
            height={300}
            className="mx-auto"
            priority
          /> */}
        </div>

        <h1 className="text-6xl font-bold mb-4" style={{ color: Colors.primary }}>
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8">
          We&apos;re sorry, the page you requested could not be found.
          Please go back to the dashboard or check the URL.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-200"
            style={{
              backgroundColor: '#F3F4F6',
              color: Colors.primary,
            }}
          >
            ← Go Back
          </button>
          
          <button
            onClick={() => router.push("/main/dashboard")}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-200 text-white"
            style={{ backgroundColor: Colors.primary }}
          >
            Back to Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}