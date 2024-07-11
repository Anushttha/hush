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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredHashtags, setFilteredHashtags] = useState([]);
  const imagePickRef = useRef();
  const db = getFirestore(app);

  const predefinedHashtags = ["Batch22", "SOE", "JNU"];

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
      const response = await fetch("/api/sendNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Notification sent successfully:", data);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const handleSubmit = async () => {
    setPostLoading(true);
  
    // Extract hashtags from the caption
    const hashtags = caption.match(/#\w+/g) || [];
  
    // Remove hashtags from the caption
    const cleanedCaption = caption.replace(/#\w+/g, "").trim();
  
    const docRef = await addDoc(collection(db, "posts"), {
      caption: cleanedCaption,
      hashtags: hashtags.map(tag => tag.substring(1)), // Remove '#' symbol from each hashtag
      image: imageFileURL,
      timestamp: serverTimestamp(),
    });
  
    const newPost = {
      caption: cleanedCaption,
      hashtags: hashtags.map(tag => tag.substring(1)), // Remove '#' symbol from each hashtag
      image: imageFileURL,
    };
  
    sendNotification(newPost);
    console.log(newPost);
    setPostLoading(false);
    setCaption("");
    setImageFileURL(null);
    setSelectedFile(null);
    location.reload();
  };
  

  const handleCaptionChange = (e) => {
    const value = e.target.value;
    setCaption(value);

    const hashtagMatch = value.match(/#(\w*)$/);
    if (hashtagMatch) {
      const query = hashtagMatch[1].toLowerCase();
      const suggestions = predefinedHashtags.filter((tag) =>
        tag.toLowerCase().startsWith(query)
      );
      setFilteredHashtags(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const addHashtagToCaption = (hashtag) => {
    const newCaption = caption.replace(/#\w*$/, `#${hashtag} `);
    setCaption(newCaption);
    setShowSuggestions(false);
  };

  return (
    <div className="flex flex-col m-5 w-[95%] sm:w-1/2 sm:m-5">
      <div className="w-full mb-4 flex items-center relative">
        <textarea
          placeholder="Whats Up?"
          rows="2"
          value={caption}
          onChange={handleCaptionChange}
          className="w-full pt-4 px-4 py-0.1 text-l resize-flex rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        ></textarea>
        {showSuggestions && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
            {filteredHashtags.map((tag, index) => (
              <li
                key={index}
                onClick={() => addHashtagToCaption(tag)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                #{tag}
              </li>
            ))}
          </ul>
        )}
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
            disabled={
              caption.trim() === "" ||
              postLoading ||
              imageFileUploading ||
              caption.replace(/#\w+/g, "").trim() === ""
            }
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
