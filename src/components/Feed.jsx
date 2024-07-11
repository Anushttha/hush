'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Post from './Post';
import { getFirestore, collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { app } from '@/firebase';
 
export default function Feed() {
  const [data, setData] = useState([]);
  const [lastLoadedPost, setLastLoadedPost] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef();

  const fetchData = async (lastPost = null) => {
    console.log('API called');
    const db = getFirestore(app);

    // Query posts ordered by timestamp descending
    let postQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(5));
    if (lastPost) {
      postQuery = query(postQuery, startAfter(lastPost));
    }
    const postSnapshot = await getDocs(postQuery);

    // Array to hold fetched data
    let fetchedData = [];

    // Iterate through each post document
    for (const postDoc of postSnapshot.docs) {
      const postData = { id: postDoc.id, ...postDoc.data() };

      // Fetch comments for this post
      const commentQuery = query(
        collection(db, 'comments'),
        where('postId', '==', postDoc.id),
        orderBy('timestamp', 'desc')
      );
      const commentSnapshot = await getDocs(commentQuery);

      const comments = commentSnapshot.docs.map((commentDoc) => ({
        id: commentDoc.id,
        ...commentDoc.data(),
      }));

      // Append post data with comments to fetchedData array
      fetchedData.push({ ...postData, comments });
    }

    // Set the last loaded post for pagination
    const lastPostInSnapshot = postSnapshot.docs[postSnapshot.docs.length - 1];
    setLastLoadedPost(lastPostInSnapshot);

    return fetchedData;
  };

  useEffect(() => {
    const initialFetch = async () => {
      const initialData = await fetchData();
      setData(initialData);
    };
    initialFetch();
  }, []);

  const loadMorePost = useCallback(async () => {
    if (!lastLoadedPost || isFetching) return;

    setIsFetching(true);
    const moreData = await fetchData(lastLoadedPost);
    setData((prevData) => [...prevData, ...moreData]);
    setIsFetching(false);
  }, [lastLoadedPost, isFetching]);

  const lastPostRef = useCallback((node) => {
    if (isFetching) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMorePost();
      }
    });

    if (node) observer.current.observe(node);
  }, [isFetching, loadMorePost]);

  return (
    <div className="mx-auto flex flex-col w-screen flex-wrap items-center">
      {data.length === 0 ? (
        <div>Loading...</div>
      ) : (
        data.map((post, index) => {
          if (data.length === index + 1) {
            return (
              <div
                className="flex-col w-[95%] sm:w-1/2 p-3 border-b-2 border-subtle hover:bg-subtle"
                key={post.id}
                ref={lastPostRef}
              >
                <Post post={post} id={post.id} comments={post.comments} />
              </div>
            );
          } else {
            return (
              <div
                className="flex-col w-[95%] sm:w-1/2 p-3 border-b-2 border-subtle hover:bg-subtle"
                key={post.id}
              >
                <Post post={post} id={post.id} comments={post.comments} />
              </div>
            );
          }
        })
      )}
      {isFetching && <div>Loading more...</div>}
    </div>
  );
}
