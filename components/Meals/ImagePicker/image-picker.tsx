"use client";
import classes from "./image-picker.module.css";
import React, { useRef, useState } from "react";
import Image from "next/image";

const ImagePicker = ({ label, name }: { label: string; name: string }) => {
  const [pickedImage, setPickedImage] = useState(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handlePicUpload = () => {
    imageRef.current?.click();
  };

  const handleImageChange = (event: any) => {
    const imageFile = event.target.files[0];

    if (!imageFile) {
      setPickedImage(null);
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      // @ts-ignore
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(imageFile);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage ? (
            <>
              <Image
                src={pickedImage}
                alt={"Image selected by the user"}
                fill
              />
            </>
          ) : (
            <p>No image uploaded</p>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={"image"}
          accept="image/*"
          name={name}
          ref={imageRef}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type={"button"}
          onClick={() => handlePicUpload()}
        >
          Submit Image
        </button>
      </div>
    </div>
  );
};
export default ImagePicker;
