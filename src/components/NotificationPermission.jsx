"use client"

import React from 'react'


import { generateAndStoreToken } from "@/firebase";

const NotificationPermission = async () => {
    
    const handleGenerateToken = async () => {
      await generateAndStoreToken();
    }
  return (
    <button onClick={handleGenerateToken}>Generate FCM Token</button>
  )
}

export default NotificationPermission