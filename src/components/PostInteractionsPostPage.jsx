"use client";
import { useEffect, useRef, useState } from "react";
import { addDoc } from "firebase/firestore";
import {
  collection,
  getFirestore,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../firebase";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { FaShare } from "react-icons/fa6";

import { useRouter } from "next/navigation";
import Link from "next/link";
import CommentInput from "./CommentInput";

export default function PostInteractionsPostPage({ postId }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const [isShared, setIsShared] = useState(false);
  const [isCommentInputOpen, setIsCommentInputOpen] = useState(false);
  const ref = useRef(null);

  const db = getFirestore(app);

  const changeHandle = (event) => {
    setComment(event.target.value);
  };
  const handleCommentIconClick = () => {
    setIsCommentInputOpen((prev) => !prev);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", postId, "comments"),
      (snapshot) => setComments(snapshot.docs)
    );
    return () => unsubscribe();
  }, [db, postId]);

  const submitHandle = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "posts", postId, "comments"), {
        comment: comment,
        timestamp: serverTimestamp(),
      });
      setComment("");
      router.push(`/posts/${postId}`);
    } catch (error) {
      console.log("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      const postUrl = `${window.location.origin}/posts/${postId}`; // Construct the post URL
      await navigator.clipboard.writeText(postUrl); // Copy the URL to clipboard
      setIsShared(true); // Update shared state
      setTimeout(() => setIsShared(false), 1000); // Hide message after 2 seconds
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

 

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsCommentInputOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className=" fixed bottom-4">
      <div ref={ref} className="items-center justify-center w-full   mt-3">
        <div className="flex justify-center items-center  gap-2">
          {" "}

          { !isCommentInputOpen ? ( <div className="bg-subtle h-10 w-10 flex justify-center items-center rounded-full relative">
            <div className="flex items-center relative">
              <HiOutlineChatBubbleLeftEllipsis
                className="h-8 w-8 text-gray cursor-pointer transition duration-500 ease-in-out p-2 "
                onClick={handleCommentIconClick}
              />

             
            </div>
          </div>) : (
            <div className="w-[60%]">
               <CommentInput postId={postId} isOpen={isCommentInputOpen}/>
            </div>
           
        ) } 
         

          {!isCommentInputOpen ? (
            <div className="bg-white justify-center  text-midnight rounded-3xl py-1 px-10">
              <button className="flex items-center" onClick={handleShare}>
                <FaShare className="h-8 w-8 text-midnight cursor-pointer transition duration-500 ease-in-out p-2" />{" "}
                Share
              </button>
            </div>
          ) : (
            <div className="bg-white mt-3 h-9 w-9 flex justify-center items-center rounded-full">
              <button onClick={handleShare}>
                <FaShare className="h-8 w-8 text-midnight cursor-pointer transition duration-500 ease-in-out p-2" />
              </button>
            </div>
          )}
        </div>

        {isShared && (
          <span className="text-[.5rem] text-gray-600 ml-1 animate-blink">
            URL Copied!
          </span>
        )}
      </div>
    </div>
  );
}
