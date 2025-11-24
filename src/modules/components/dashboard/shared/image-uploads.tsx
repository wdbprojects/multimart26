"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  type: "standard" | "profile" | "cover";
  dontShowPreview?: boolean;
}

interface UploadResult {
  info: {
    secure_url: string;
  };
}

const ImageUploads: FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  type,
  dontShowPreview,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (type === "profile") {
    return (
      <div className="border-foreground relative my-6 flex w-full flex-row items-center justify-start gap-3">
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_PRESET_NAME}
          onSuccess={onUpload}
        >
          {({ open }) => {
            return (
              <Button
                className="g-2 flex items-center justify-center"
                variant="default"
                disabled={disabled}
                onClick={() => open()}
              >
                <Upload />
                <span>Upload Image</span>
              </Button>
            );
          }}
        </CldUploadWidget>
        {value?.length > 0 && (
          <Image
            src={value[0]}
            alt="img"
            width={300}
            height={300}
            className="absolute left-[50%] h-22 w-22 -translate-x-[50%] rounded-lg object-cover"
          />
        )}
      </div>
    );
  }

  return <div></div>;
};

export default ImageUploads;
