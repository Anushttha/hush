import CreatePost from "@/components/CreatePost";
import Feed from "@/components/Feed";
import Image from "next/image";


export default function Home() {
  return (
    <main>
      <CreatePost />
      <Feed/>
    </main>
  );
}
