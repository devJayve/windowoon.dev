'use client';
import React, { RefObject, useRef } from 'react';
import {
  ImageUploadResult,
  uploadToStorageAction,
} from '@/features/post/action/uploadToStorageAction';

interface ImageInputProps {
  imageInputRef: RefObject<HTMLInputElement>;
  onUploadStart(markerId: string): void;
  onUploadComplete(markerId: string, result?: ImageUploadResult): void;
}

export function ImageInput({ imageInputRef, onUploadStart, onUploadComplete }: ImageInputProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || !formRef) return;

    const formData = new FormData();
    formData.append('image', files[0]);

    const markerId = Math.random().toString(36).substring(7);
    try {
      onUploadStart(markerId);
      const result = await uploadToStorageAction(null, formData);
      onUploadComplete(markerId, result.data);
      console.log('결과', result);
    } catch (error) {
      console.error(error);
      onUploadComplete(markerId);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <form ref={formRef}>
      <input
        id="image"
        name="image"
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </form>
  );
}
