

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  appName: "Hush",
  shortDescription: "Anonymous JNU secrets and confessions.",
  longDescription: "Hush is the go-to app for JNU students to share and discover campus secrets, confessions, and anonymous thoughts. Connect with your college community in a safe, private space where you can express yourself freely.",
  keyFeatures: [
    "100% anonymous posting",
    "University-specific feeds",
    "Upvote and comment on posts",
    "Trending topics",
    "Customizable content filters"
  ],
  category: "Social Networking",
  keywords: [
    "anonymous",
    "secrets",
    "confessions",
    "university",
    "college",
    "campus",
    "social",
    "community",
    "private",
    "safe"
  ],
  ageRating: "17+"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-neue bg-midnight text-light  `}>
        <div className=" flex-col flex items-center ">
         
          {children}
        </div>
      </body>
    </html>
  );
}
