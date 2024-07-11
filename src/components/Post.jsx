import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from "react-icons/hi";
import Comments from "./Comments";
import PostInteractions from "./PostInteractions";
import CommentInput from "./CommentInput";

export default function Post({ post, id, comments }) {
  const [postAge, setPostAge] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isCommentInputOpen, setIsCommentInputOpen] = useState(false);

  useEffect(() => {
    const createdAt = post.timestamp.toDate(); // Convert Firestore Timestamp to Date object
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
  }, [post.timestamp]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleCommentInput = () => {
    setIsCommentInputOpen((prev) => !prev);
  };

  return (
    <div
      className="bg-subtle rounded-lg p-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
        <Link href={`/posts/${id}`}>
          <img src={post?.image} className="rounded-lg w-[100%]  mr-2" />
        </Link>
        <div>
           <div className="flex justify-between">
          {/* post */}<div>
          <Link href={`/posts/${id}`}>
            <p className="text-gray-800 text-sm my-3 font-normal dark:text-light">
              {post?.caption}
            </p>
            <p className="text-time text-[0.65rem] flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-time pb-2"></div>
              {postAge} {/* Display post age */}
            </p>
            <div className="flex text-xs gap-2 mt-4">
              {post?.hashtags.map((tag, index) => (
                <p
                  key={index}
                  className={`text-gray rounded-full px-3 py-1 bg-midnight`}
                >
                  {tag}
                </p>
              ))}
            </div>
          </Link>
         
        </div>
        <PostInteractions
          onToggleCommentInput={toggleCommentInput}
          postId={id}
        />
        </div>
        <CommentInput  postId={id} isOpen={isCommentInputOpen} />
      </div>
    </div>
  );
}
