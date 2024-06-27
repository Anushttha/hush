"use client";
import { useEffect, useState } from "react";
import { addDoc } from "firebase/firestore";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { app } from "../firebase";
import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function CreateComment({ postId }) {
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
  }, [db]);
  const submitHandle = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("hi");

    try {
      await addDoc(collection(db, "posts", postId, "comments"), {
        comment: comment,

        timestamp: serverTimestamp(),
      });
      setComment("");
      console.log("hiiii");
      router.push(`/posts/${postId}`)
    } catch (error) {
      console.log("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-col ">
      <div className="flex items-center ">
        <HiOutlineChat
          className="h-8 w-8 text-[#898FBB] cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-midnight hover:bg-primary"
          onClick={() => setOpen(!open)}
        />
        {comments.length > 0 && <span className="text-xs text-light">{comments.length}</span>}
      </div>

      {open && (<div className=" ">
        <form className="flex gap-1 " onSubmit={submitHandle}>
          <input
            type="text"
            placeholder="Add a comment..."
            name="comment"
            value={comment}
            onChange={changeHandle}
            required
            className="p-1 "
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
  );
}
