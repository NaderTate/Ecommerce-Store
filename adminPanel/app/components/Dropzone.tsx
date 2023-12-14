"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { LuUpload } from "react-icons/lu";
type Props = {
  className?: string;
  handleUploadImages: (files: File[]) => void;
};
const Dropzone = ({ className, handleUploadImages }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      handleUploadImages(acceptedFiles);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
  });
  return (
    <div
      {...getRootProps({
        className,
      })}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <LuUpload />

        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};
export default Dropzone;
