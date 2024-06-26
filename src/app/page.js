import CreatePost from "@/components/CreatePost";
import Feed from "@/components/Feed";
import Image from "next/image";


export default function Home() {
  return (
    <main className="dark: bg-midnight">
      <div className="  flex-col flex items-center dark:bg-midnight ">
<CreatePost />
      <Feed/>
      </div>
      
    </main>
  );
}
