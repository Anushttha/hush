

import React from "react";
import CreatePost from "@/components/CreatePost";
import Feed from "@/components/Feed";

import NotificationPermission from "@/components/NotificationPermission";

export default async function Page() {

  return (
    <>
      <NotificationPermission />
      <CreatePost />
     <Feed />
    </>
  )
}