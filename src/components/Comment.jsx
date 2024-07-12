'use client';

import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import {
  getFirestore,
  onSnapshot,
  collection,
  setDoc,
  doc,
  serverTimestamp,
  deleteDoc,
} from 'firebase/firestore';
import { app } from '../firebase';


export default function Comment({ comment, commentId, originalPostId }) {

  const db = getFirestore(app);




  return (
    <div className=' text-gray flex p-4 border-b border-subtle hover:bg-subtle pl-10'>



      <p className=' text-xs my-2'> - {comment?.comment}</p>


    </div>
  );
}