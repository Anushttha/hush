"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
  snapshotEqual,
} from "firebase/firestore";
import { FaFileImage } from "react-icons/fa6";

import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const CreatePost = () => {
  const [imageFileURL, setImageFileURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const imagePickRef = useRef();
  const db = getFirestore(app);

  // showing selected image to user
  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  uploadImageToStorage = () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setImageFileURL(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };

  return (
    <div>
      <div>
        <textarea name="" placeholder="Whats Up?" rows="2" id=""></textarea>
      </div>
      {selectedFile && (
        <img
          src={imageFileURL}
          alt={selectedFile}
          className={`w-full max-h-[250px] object-cover cursor-pointer
            ${imageFileUploading ? "animate-pulse" : ""}`}
        />
      )}
      <div>
        <FaFileImage
          className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"
          onClick={() => imagePickRef.current.click()}
        />
        <input
          type="file"
          accept="image/*"
          ref={imagePickRef}
          onChange={addImageToPost}
          hidden
        />
        <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
