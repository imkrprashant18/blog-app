import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/store/authSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (status === "loading") {
    return <p className="text-center text-gray-600">Loading user data...</p>;
  }

  if (status === "failed") {
    return (
      <p className="text-center text-red-600">
        Error: {error || "Failed to fetch user data"}
      </p>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold">User Details</CardTitle>
      </CardHeader>
      <CardContent>
        {user ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-500">
              <thead className="bg-gray-100 border border-gray-500">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border border-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border border-gray-500">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border border-gray-500">
                    Avatar
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border border-gray-500">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-500">
                    {`${user.fullName || ""} ${user.lastName || ""}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-500">
                    <img src={user.avatar || ""} className="w-10 h-10" alt="" />
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.createdAt || ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600">No user data available.</p>
        )}
      </CardContent>
    </Card>
  );
}
