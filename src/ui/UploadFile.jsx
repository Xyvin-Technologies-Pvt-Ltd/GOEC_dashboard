import React, { useState } from "react";
import { ReactComponent as UploadIcon } from "../assets/icons/Group 37.svg";
import { useDropzone } from "react-dropzone";

const UploadFile = ({ onFileSelect }) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      onFileSelect(acceptedFiles[0]);
    },
  });

  return (
    <div
      {...getRootProps({})}
      className="flex w-full cursor-pointer flex-col items-center justify-center gap-2.5 rounded border border-dashed border-white/20 bg-[var(--inner)] px-28 py-6"
    >
      <label htmlFor="fileInput">
        <div>
          <UploadIcon />
        </div>
      </label>
      <div className="flex flex-col items-center justify-center font-light text-white">
        <span>Drop your file here to upload</span>
        <span>or select from storage</span>
      </div>
      <input style={{ display: "none" }} {...getInputProps({})} />
    </div>
  );
};

export default UploadFile;
