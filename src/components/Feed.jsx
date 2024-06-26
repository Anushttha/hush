"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { app } from "../firebase"; // Adjust the path as necessary
import Post from "./Post";

export default function Feed() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const postQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      const postSnapshot = await getDocs(postQuery);

      let fetchedData = [];
      for (const postDoc of postSnapshot.docs) {
        const postData = { id: postDoc.id, ...postDoc.data() };

        // Fetch comments for each post
        const commentQuery = query(
          collection(db, "comments"),
          where("postId", "==", postDoc.id),
          orderBy("timestamp", "desc")
        );
        const commentSnapshot = await getDocs(commentQuery);

        const comments = commentSnapshot.docs.map(commentDoc => ({
          id: commentDoc.id,
          ...commentDoc.data()
        }));

        fetchedData.push({ ...postData, comments });
      }

      setData(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto flex flex-col w-screen flex-wrap items-center ">
      {data.map((post) => (
       <div className='flex-col w-[95%] sm:w-1/2 p-3 border-b border-subtle hover:bg-subtle' key={post.id}>

          <Post post={post} id={post.id} comments={post.comments} />
        </div>
      ))}
    </div>
  );
}
