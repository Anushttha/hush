"use client";
import { useEffect, useState } from "react";
import { addDoc } from "firebase/firestore";
import {
  collection,
  getFirestore,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../firebase";


import { useRouter } from "next/navigation";

import { LuSend } from "react-icons/lu";


export default function CommentInput({ postId, isOpen }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const router = useRouter();


  const db = getFirestore(app);

  const changeHandle = (event) => {
    setComment(event.target.value);
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
  if (!isOpen) return null;


  return (
    <div
    className="border-[1px] mt-3 rounded-xl w-[100%] border-gray-300 p-2 shadow-lg "
    
  >
    <form className="flex  gap-1" onSubmit={submitHandle}>
      <input
        type="text"
        placeholder="Add a comment..."
        name="comment"
        value={comment}
        onChange={changeHandle}
        required
        className="p-1 focus:outline-none bg-subtle w-[100%] flex-grow"
      />
      <button
        type="submit"
        disabled={loading}
        className=" bg-subtle text-light px-4 py-1 rounded hover:bg-midnight"
      >
        <LuSend />
      </button>
    </form>
  </div>
  );
};

