"use client"

import CreatePost from "@/components/CreatePost";
import Feed from "@/components/Feed";
import { generateAndStoreToken } from "@/firebase";
import Image from "next/image";


export default function Home() {
  const handleGenerateToken = async () => {
    await generateAndStoreToken();
  }
  return (
    <main className="dark: bg-midnight">
       <button onClick={handleGenerateToken}>Generate FCM Token</button>
      <div className="  flex-col flex items-center dark:bg-midnight ">
<CreatePost />
      <Feed/>
      </div>
      
    </main>
  );
}
