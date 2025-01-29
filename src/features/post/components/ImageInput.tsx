import React, { RefObject } from 'react';

interface ImageInputProps {
  fileInputRef: RefObject<HTMLInputElement>;
  handleImageUpload: (file: File) => void;
}

export function ImageInput({ fileInputRef, handleImageUpload }: ImageInputProps) {
  return (
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={e => {
        const file = e.target.files?.[0];
        if (file) handleImageUpload(file);
        e.target.value = '';
      }}
    />
  );
}
