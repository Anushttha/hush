

import React from "react";
import CreatePost from "@/components/CreatePost";
import Feed from "@/components/Feed";

import NotificationPermission from "@/components/NotificationPermission";
import Header from "@/components/Header";

export default async function Page() {

  return (
    <>
     <Header />
    
      <CreatePost />
     <Feed />
    </>
  )
}