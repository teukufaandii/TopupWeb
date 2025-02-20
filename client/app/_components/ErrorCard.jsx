"use client";

import { AlertCircle, Printer } from "lucide-react";
import React from "react";

const ErrorCard = ({ errorType }) => {
  const errorMessages = {
    not_found: {
      title: "Not Found",
      message: "The requested invoice or information does not exist. Please check again.",
      bgColor: "bg-red-900",
      borderColor: "border-red-500",
      textColor: "text-red-700",
      buttonColor: "bg-red-500",
    },
    unauthorized: {
      title: "Unauthorized",
      message: "You do not have permission to access this resource.",
      bgColor: "bg-yellow-900",
      borderColor: "border-yellow-500",
      textColor: "text-yellow-700",
      buttonColor: "bg-yellow-500",
    },
    server_error: {
      title: "Server Error",
      message: "An unexpected error occurred. Please try again later.",
      bgColor: "bg-gray-900",
      borderColor: "border-gray-500",
      textColor: "text-gray-700",
      buttonColor: "bg-gray-500",
    },
    data_not_found: {
      title: "Data Not Found",
      message: "The requested invoice or information does not exist. Please check again.",
      bgColor: "bg-blue-900",
      borderColor: "border-blue-500",
      textColor: "text-blue-700",
      buttonColor: "bg-blue-500",
    },
  };

  const error = errorMessages[errorType] || errorMessages.not_found;

  return (
    <div className="max-w-screen-2xl mx-auto py-3">
      <div className="flex flex-1 flex-col w-full lg:w-auto">
        <div className="grow py-3">
          <div className="flex flex-col gap-3 px-3 flex-1">
            <div className={`flex flex-col gap-3 flex-1 overflow-hidden relative lg:rounded-lg rounded-none shadow-inner ${error.bgColor}`}>
              {/* TITLE BANNER */}
              <div className={`flex flex-row lg:rounded-lg rounded-none shadow-inner p-4 overflow-hidden relative ${error.bgColor}`}>
                <div className="flex flex-col gap-2 justify-end w-full">
                  <div className="flex flex-row justify-between gap-2">
                    <span className="text-3xl text-white font-bold">{error.title}</span>
                    <div className="inline-flex">
                      <button className={`px-4 ${error.buttonColor} text-white text-xs h-9 rounded-lg text-sm h-auto py-2.5 hover:opacity-80 justify-center items-center gap-2 flex select-none no-underline`}>
                        <Printer className="w-4 h-4 text-white" />
                        <span className="font-medium line-clamp-1">Print Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 p-4 pt-0">
                {/* ERROR MESSAGE */}
                <div className={`flex flex-col items-center justify-center text-center gap-3 p-6 border ${error.borderColor} rounded-lg bg-opacity-50`}> 
                  <AlertCircle className={`w-12 h-12 ${error.textColor}`} />
                  <span className={`text-lg font-semibold ${error.textColor}`}>{error.title}</span>
                  <span className="text-sm text-gray-600">{error.message}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorCard;
