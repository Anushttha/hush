// app/components/Feed.js

import React, { useEffect, useState } from "react";
import Post from "./Post";

export default function Feed() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/posts");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto flex flex-col w-screen flex-wrap items-center ">
      {data.map((post) => (
        <div className='flex-col w-[95%] sm:w-1/2 p-3 border-b-2 border-subtle hover:bg-subtle' key={post.id}>
          <Post post={post} id={post.id} comments={post.comments} />
        </div>
      ))}
    </div>
  );
}
