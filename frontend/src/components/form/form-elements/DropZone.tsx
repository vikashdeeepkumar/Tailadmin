"use client";
import React,{ useState, useEffect,forwardRef,useImperativeHandle } from "react";
import ComponentCard from "../../common/ComponentCard";
import { useDropzone ,FileWithPath} from "react-dropzone";
import Image from "next/image";

interface FileWithPreview extends FileWithPath {
  preview: string;
}

interface DropzoneComponentProps {
  setFiles: (files: FileWithPath[]) => void;
  setRejectedFiles: (rejectedFiles: FileRejection[]) => void;
}
const MAX_IMAGE_SIZE_MB = 4;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

const DropzoneComponent = forwardRef<DropzoneHandle, DropzoneComponentProps>(({ setFiles }, ref) => {
  const [localFiles, setLocalFiles] = useState<FileWithPreview[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<any[]>([]);
  
  // Expose clearFiles method via ref
  useImperativeHandle(ref, () => ({
    clearFiles: () => {
      localFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      rejectedFiles.forEach(file => URL.revokeObjectURL(file.file.preview));
      setLocalFiles([]);
      setRejectedFiles([]);
      setFiles([]);
    }
  }));

  const onDrop = (acceptedFiles: FileWithPath[],rejectedFileRejections: FileRejection[]) => {
     localFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    rejectedFiles.forEach(file => URL.revokeObjectURL(file.file.preview));

    // Append new files to the existing files array
    const newLocalFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setLocalFiles((prevFiles) => [...prevFiles, ...newLocalFiles]);
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

    // Append new rejected files to the existing rejected files array
    setRejectedFiles((prevRejectedFiles) => [...prevRejectedFiles, ...rejectedFileRejections]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
    maxSize: MAX_IMAGE_SIZE_BYTES,
  });
  
  useEffect(() => {
    return () => {
      localFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      rejectedFiles.forEach(file => URL.revokeObjectURL(file.file.preview));
    };
  }, [localFiles, rejectedFiles]);

   const removeFile = (name: string) => {
    const newLocalFiles = localFiles.filter((file) => file.name !== name);
    const newRejectedFiles = rejectedFiles.filter((file) => file.file.name !== name);

    setLocalFiles(newLocalFiles);
    setRejectedFiles(newRejectedFiles);
    
    
    setFiles(newLocalFiles); 
  };



  return (
       <div className="space-y-4">
      <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
        <div
          {...getRootProps()}
          className={`dropzone rounded-xl   border-dashed border-gray-300 p-7 lg:p-10
        ${
          isDragActive
            ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
            : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
        }
      `}
          id="demo-upload"
        >
          {/* Hidden Input */}
          <input {...getInputProps()} />

          <div className="dz-message flex flex-col items-center m-0!">
            {/* Icon Container */}
            <div className="mb-[22px] flex justify-center">
              <div className="flex h-[68px] w-[68px]  items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <svg
                  className="fill-current"
                  width="29"
                  height="28"
                  viewBox="0 0 29 28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                  />
                </svg>
              </div>
            </div>

            {/* Text Content */}
            <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
              {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
            </h4>

            <span className=" text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
              Drag and drop your PNG, JPG, WebP, SVG images here or browse
            </span>

            <span className="font-medium underline text-theme-sm text-brand-500">
              Browse File
            </span>
          </div>
        </div>
      </div>
      {localFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mt-4">
          {localFiles.map((file) => (
            <div key={file.name} className="relative rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={file.preview}
                alt={file.name}
                width={40}
                height={40}
                layout="responsive"
                objectFit="cover"
              />
              <button
                onClick={() => removeFile(file.name)}
                className="absolute top-1 right-1 bg-brand-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
      {rejectedFiles.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-error-600 font-semibold mb-2">Rejected Files:</p>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {rejectedFiles.map(({ file, errors }) => (
              <div key={file.name} className="relative rounded-lg overflow-hidden border border-red-500">
                <div className="p-2">
                    <p className="text-xs text-red-500 break-words">{file.name}</p>
                    {errors.map(e => (
                        <p key={e.code} className="text-xs text-red-500 mt-1">file size is greater than 4mb</p>
                    ))}
                </div>
                <button
                  onClick={() => removeFile(file.name)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
  );
  
});

export default DropzoneComponent;