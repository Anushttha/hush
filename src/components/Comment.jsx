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
    <div className='flex p-3 border-b border-gray-200 hover:bg-gray-50 pl-10'>



        <p className='text-gray-800 text-xs my-3'>{comment?.comment}</p>
     
      
    </div>
  );
}