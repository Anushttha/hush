import CreatePost from "@/components/CreatePost";
import Feed from "@/components/Feed";
import Image from "next/image";


export default function Home() {
  return (
    <main className=" flex-col flex items-center ">
      <CreatePost />
      <Feed/>
    </main>
  );
}
