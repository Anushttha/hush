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
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { FaShare } from "react-icons/fa6";

import { useRouter } from "next/navigation";

export default function PostInteractions({ postId }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
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

  return (
    <div className="flex gap-2 mt-3">
   <div className="bg-midnight h-10 w-10 flex justify-center items-center rounded-full relative">
  <div className="flex items-center relative">
    <HiOutlineChatBubbleLeftEllipsis
      className="h-8 w-8 text-gray cursor-pointer transition duration-500 ease-in-out p-2 hover:text-midnight hover:bg-primary"
      onClick={() => setOpen(!open)}
    />

    {comments.length > 0 && (
      <div className="absolute top-0 right-0 bg-white text-midnight h-3 w-3 rounded-full flex items-center justify-center">
        <span className="text-[0.5rem] text-gray-600">
          {comments.length}
        </span>
      </div>
    )}

    {open && (
      <div
        className="absolute top-0 left-12 border-gray-300 p-2 shadow-lg z-10"
        style={{ width: "200px", top: "-9px" }}
      >
        <form className="flex gap-1" onSubmit={submitHandle}>
          <input
            type="text"
            placeholder="Add a comment..."
            name="comment"
            value={comment}
            onChange={changeHandle}
            required
            className="p-1 flex-grow"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-light px-4 py-1 rounded hover:bg-blue-600"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    )}
  </div>
</div>


      <div className="bg-white h-9 w-9 flex justify-center items-center rounded-full">
        <FaShare className="h-8 w-8 text-midnight cursor-pointer  transition duration-500 ease-in-out p-2 hover:text-midnight hover:bg-primary" />
      </div>
    </div>
  );
}
