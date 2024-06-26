"use client";
import { useEffect, useRef, useState } from "react";
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
  const [postLoading, setPostLoading] = useState(false);
  const [caption, setCaption] = useState("");
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

  console.log(caption);

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const uploadImageToStorage = () => {
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

  const handleSubmit = async () => {
    setPostLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      caption,
      image: imageFileURL,
      timestamp: serverTimestamp(),
    });
    setPostLoading(false);
    setCaption("");
    setImageFileURL(null);
    setSelectedFile(null);
    location.reload();
  };

  return (
<div className="flex m-5 w-[95%] sm:w-1/2 sm:m-5">
      <div  className="w-full">
        <textarea
          name=""
          placeholder="Whats Up?"
          rows="2"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          id=""
          className="w-full"
        ></textarea>
      </div>
      {selectedFile && (
        <img
          src={imageFileURL}
          alt={selectedFile}
          className={`w-full max-h-[250px] object-cover cursor-pointer
            ${imageFileUploading ? "animate-pulse" : ""}`}
        />
      )}
      <div className="flex">
        <FaFileImage
          className="h-10 w-10  m-auto  p-2 text-primary hover:bg-sky-100 rounded-full cursor-pointer"
          onClick={() => imagePickRef.current.click()}
        />
        <input
          type="file"
          accept="image/*"
          ref={imagePickRef}
          onChange={addImageToPost}
          hidden
        />
        <button
          disabled={caption.trim() === "" || postLoading || imageFileUploading}
          className="bg-primary text-white m-auto px-4 h-[30px] rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
