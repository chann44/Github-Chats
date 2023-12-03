"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onchange: (url?: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile";
}

export function FileUpload(props: FileUploadProps) {
  const fileType = props.value.split(".").pop();
  if (props.value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20 mx-auto">
        <Image fill alt="upload" className="rounded-full" src={props.value} />
        <div
          role="button"
          onClick={() => props.onchange("")}
          className="h-4 w-4 bg-destructive absolute top-0 right-0 flex justify-center items-center rounded-full"
        >
          <X />
        </div>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={props.endpoint}
      onClientUploadComplete={(res) => {
        props.onchange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
