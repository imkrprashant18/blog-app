"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserAuthStore } from "@/store/user-auth-store";
const UserDetials = () => {
  const { currentUser } = useUserAuthStore();
  return (
    <>
      <div className="flex  items-center gap-4">
        <Avatar>
          <AvatarImage
            src={currentUser?.avatar}
            alt={currentUser?.fullName}
            className="object-cover "
          />
          <AvatarFallback>
            {currentUser?.fullName
              .split(" ")
              .map((name) => name[0])
              .join("")}{" "}
          </AvatarFallback>
        </Avatar>
        <h1 className="font-semibold text-md text-indigo-800">
          {currentUser?.fullName}
        </h1>
      </div>
    </>
  );
};

export default UserDetials;
