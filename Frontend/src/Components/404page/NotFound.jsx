import React from "react";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-lg">
        {/* Large 404 heading */}
        <h1 className="text-8xl font-bold text-gray-900">404</h1>

        {/* Error messages */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Page not found
          </h2>
          <p className="text-gray-600">
            Oops! The page you're looking for seems to have wandered off into
            cyberspace.
          </p>
        </div>

        {/* Fun illustration using pure CSS */}
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 animate-ping"></div>
          <div className="absolute inset-4 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute inset-8 bg-blue-500 rounded-full opacity-30"></div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Go Back
          </button>
          <Link to="/">
            <button className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors gap-2">
              <Home size={20} />
              Home Page
            </button>
          </Link>
        </div>

        {/* Additional help text */}
        <p className="text-sm text-gray-500 mt-8">
          If you think this is a mistake, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
