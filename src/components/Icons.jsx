'use client';

import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from 'react-icons/hi';


import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { modalState, postIdState } from '../atom/modalAtom';
import { useRecoilState } from 'recoil';

export default function Icons({ id, uid }) {


  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState); 
  const [comments, setComments] = useState([]); 
  const db = getFirestore(app);



  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', id, 'comments'),
      (snapshot) => setComments(snapshot.docs)
    );
    return () => unsubscribe();
  }, [db, id]);



  return (
    <div className='flex justify-start gap-5 p-2 text-gray-500'>
      <div className='flex items-center'>
        <HiOutlineChat
          className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100'
          onClick={() => {
          
              setOpen(!open);
              setPostId(id);
            
          }}
        />
        {comments.length > 0 && (
          <span className='text-xs'>{comments.length}</span>
        )}
      </div>
    </div>
  );
}