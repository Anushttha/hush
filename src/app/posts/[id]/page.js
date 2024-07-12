"use client";
import { useEffect, useState } from "react";
import { app } from "../../../firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
import { BsChatSquareDots } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import Comment from "@/components/Comment";
import Comments from "@/components/Comments";
import PostInteractions from "@/components/PostInteractions";
import { IoIosArrowBack } from "react-icons/io";
import PostInteractionsPostPage from "@/components/PostInteractionsPostPage";

export default function PostPage({ params }) {
  const [post, setPost] = useState(null);
  const [postAge, setPostAge] = useState("");

  useEffect(() => {
    async function fetchPost() {
      const db = getFirestore(app);
      try {
        const querySnapshot = await getDoc(doc(db, "posts", params.id));
        if (querySnapshot.exists()) {
          const postData = querySnapshot.data();
          // Assuming `timestamp` is a Firestore Timestamp field in your document
          setPost({
            ...postData,
            id: querySnapshot.id,
            timestamp: postData.timestamp.toDate(),
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    }

    fetchPost();
  }, [params.id]);

  useEffect(() => {
    if (post && post.timestamp) {
      const createdAt = post.timestamp;
      const now = new Date();
      const elapsed = now - createdAt;
      const seconds = Math.floor(elapsed / 1000);

      let timeAgo = "";

      if (seconds < 0) {
        timeAgo = `just now`;
      } else if (seconds < 60) {
        timeAgo = `${seconds} seconds ago`;
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        timeAgo = `${minutes} minutes ago`;
      } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        timeAgo = `${hours} hours ago`;
      } else {
        const days = Math.floor(seconds / 86400);
        timeAgo = `${days} days ago`;
      }

      setPostAge(timeAgo);
    }
  }, [post]);

  if (!post) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  return (
    <div className="">
      <Link
        href={"/"}
        className="bg-midnight h-10 w-10 rounded-full flex items-center justify-center top-8 left-2  fixed"
      >
        <IoIosArrowBack className="h-5 text-light w-5 mr-[0.15rem]" />
      </Link>

      <div>
        <img src={post?.image} className=" w-[100%]  mr-2" />
      </div>
      <div className="flex mx-3 justify-between items-center">
        <div className="flex text-xs gap-2 mt-4">
          {post?.hashtags.map((tag, index) => (
            <p
              key={index}
              className="text-gray rounded-full px-3 py-1 bg-subtle"
            >
              {tag}
            </p>
          ))}
        </div>

        <div>
          <div className="text-time mt-4 text-[0.65rem] flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-time pb-2"></div>
            {postAge} {/* Display post age */}
          </div>
        </div>
      </div>

      <div>
        <div>
          <div className=" m-3 text-light">{post?.caption}</div>
        </div>

        <div>
          
          <Comments  id={params.id} />
        </div>

        <PostInteractionsPostPage postId={params.id} />
      </div>
    </div>
  );
}
