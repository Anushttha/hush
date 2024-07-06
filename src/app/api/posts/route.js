// src/app/api/posts/route.js
import { NextResponse } from "next/server";
import { getFirestore, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { app } from "@/firebase";

export async function GET() {
  try {
    console.log("API called");
    const db = getFirestore(app);

    // Query posts ordered by timestamp descending
    const postQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const postSnapshot = await getDocs(postQuery);

    // Array to hold fetched data
    let fetchedData = [];

    // Iterate through each post document
    for (const postDoc of postSnapshot.docs) {
      const postData = { id: postDoc.id, ...postDoc.data() };

      // Fetch comments for this post
      const commentQuery = query(
        collection(db, "comments"),
        where("postId", "==", postDoc.id),
        orderBy("timestamp", "desc")
      );
      const commentSnapshot = await getDocs(commentQuery);

      const comments = commentSnapshot.docs.map(commentDoc => ({
        id: commentDoc.id,
        ...commentDoc.data()
      }));

      // Append post data with comments to fetchedData array
      fetchedData.push({ ...postData, comments });
    }

    // Return fetchedData as JSON response
    return NextResponse.json(fetchedData);
  } catch (error) {
    console.error("Error fetching data:", error);

    // Check for specific Firebase quota exceeded error
    if (error.code === 'resource-exhausted') {
      return NextResponse.json({ error: "Firebase quota exceeded. Please try again later." }, { status: 500 });
    }

    // Handle other errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
