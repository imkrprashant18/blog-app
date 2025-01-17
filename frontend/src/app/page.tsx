"use client";

import HomePage from "@/pages/home-page/home-page";
import PublicRoute from "@/components/user-auth/public-route";
export default function Home() {
  return (
    <>
      <PublicRoute>
        <HomePage />
      </PublicRoute>
    </>
  );
}
