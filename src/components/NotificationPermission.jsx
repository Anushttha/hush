'use client'

import React, { useState } from "react";
import { FiBell } from "react-icons/fi";
import { generateAndStoreToken } from "@/firebase";

const NotificationPermission = () => {
  const [showModal, setShowModal] = useState(false);

  const handleGenerateToken = async () => {
    await generateAndStoreToken();
    setShowModal(false); // Close the modal after generating token
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className=" bottom-4 right-4   px-4 py-2 rounded-full shadow-lg transform transition-transform hover:scale-105 focus:outline-none"
      >
        <FiBell className="h-6 w-6 mr-2 animate-bounce" />
        
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-midnight text-light p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Stay Updated!</h2>
            <p className="text-gray-700 mb-4">
              Enable notifications to never miss out on important updates and
              posts from your friends.
            </p>
            <div className="flex  mt-4">
              <button
                onClick={handleGenerateToken}
                className="bg-blue-500 text-black px-4 py-2 rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
              >
                Enable Notifications
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationPermission;
