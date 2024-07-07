import React from "react";
import CreatePost from "@/components/CreatePost";
import Post from "@/components/Post";

import NotificationPermission from "@/components/NotificationPermission";

async function fetchPosts() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const res = await fetch(`${API_URL}/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export default async function Feed() {
  const data = await fetchPosts();

  return (
    <>
      <NotificationPermission />
      <CreatePost />
      <div className="mx-auto flex flex-col w-screen flex-wrap items-center">
        {data.map((post) => (
          <div
            className="flex-col w-[95%] sm:w-1/2 p-3 border-b-2 border-subtle hover:bg-subtle"
            key={post.id}
          >
            <Post post={post} id={post.id} comments={post.comments} />
          </div>
        ))}
      </div>
    </>
  )
}
