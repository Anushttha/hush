"use client";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
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
  const [compressedFile, setCompressedFile] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const imagePickRef = useRef();
  const db = getFirestore(app);

  // Compress image
  const compressImage = (file, callback) => {
    const img = document.createElement("img");
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 400;

      const scaleSize = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleSize;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        callback(blob);
      }, "image/jpeg");
    };

    reader.readAsDataURL(file);
  };

  // showing selected image to user
  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      compressImage(file, (compressed) => {
        setSelectedFile(file);
        setCompressedFile(compressed);
        setImageFileURL(URL.createObjectURL(compressed));
      });
    }
  };

  useEffect(() => {
    if (compressedFile) {
      uploadImageToStorage();
    }
  }, [compressedFile]);

  const uploadImageToStorage = () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, compressedFile);
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

  const sendNotification = async (post) => {
    try {
      const response = await fetch('/api/sendNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Notification sent successfully:', data);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleSubmit = async () => {
    setPostLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      caption,
      image: imageFileURL,
      timestamp: serverTimestamp(),
    });

    const newPost = {
      caption,
      image: imageFileURL,
    };
    
    sendNotification(newPost);
    console.log(newPost)
    setPostLoading(false);
    console.log(setPostLoading)
    setCaption("");
    setImageFileURL(null);
    setSelectedFile(null);
    location.reload();
  };

  return (
    <div className="flex flex-col m-5 w-[95%] sm:w-1/2 sm:m-5">
      <div className="w-full mb-4 flex items-center">
        <textarea
          placeholder="Whats Up?"
          rows="2"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full pt-4 px-4 py-0.1 text-l resize-flex rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        ></textarea>
        <div className="flex ml-2">
          <FaFileImage
            className="h-10 w-10 p-2 text-primary hover:bg-sky-100 rounded-full cursor-pointer"
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
            className="bg-primary text-midnight ml-2 px-4 h-[35px] rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50 disabled:text-light mt-1 flex items-center justify-center"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
      {selectedFile && (
        <div className="w-full mt-4 mb-4">
          <img
            src={imageFileURL}
            alt={selectedFile}
            className={`w-full max-h-[250px] object-cover cursor-pointer
          ${imageFileUploading ? "animate-pulse" : ""}`}
          />
        </div>
      )}
    </div>
  );
};

export default CreatePost;
