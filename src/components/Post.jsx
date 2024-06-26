import Link from "next/link";
import CreateComment from "./CreateComment";
import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from "react-icons/hi";
import Comments from "./Comments";

export default function Post({ post, id, comments }) {
  return (
    <div>
      <Link href={`/posts/${id}`}>
        <img src={post?.image} className="rounded-2xl mr-2" />
      </Link>
      <div className="flex justify-between">
        <Link href={`/posts/${id}`}>
          <p className="text-gray-800 text-sm my-3 dark:text-[#fbfbfb]">
            {post?.caption}
          </p>
        </Link>

        <CreateComment postId={id} />
      </div>
      {/* Display comments */}

      {/* CreateComment component with postId */}

      {/* <Comments id={id} /> */}
    </div>
  );
}
