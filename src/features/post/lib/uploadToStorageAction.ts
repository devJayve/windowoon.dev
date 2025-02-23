'use server';
import { put } from '@vercel/blob';
import { ServerActionState } from '@/features/comment/types';
import sharp from 'sharp';

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ImageUploadResult {
  url: string;
  filename: string;
  dimensions: ImageDimensions;
}

const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 300;

async function getImageDimensions(file: File): Promise<ImageDimensions> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const metadata = await sharp(buffer).metadata();

  return {
    width: metadata.width ?? DEFAULT_WIDTH,
    height: metadata.height ?? DEFAULT_HEIGHT,
  };
}

export async function uploadToStorageAction(
  prevState: ServerActionState<ImageUploadResult> | null,
  formData: FormData,
): Promise<ServerActionState<ImageUploadResult>> {
  const image = formData.get('image') as File;

  if (!image) {
    return {
      success: false,
      message: '이미지가 존재하지 않습니다.',
    };
  }

  try {
    const dimensions = await getImageDimensions(image);

    const result = await put(image.name, image, {
      access: 'public',
    });

    return {
      data: { url: result.url, filename: image.name, dimensions: dimensions },
      success: true,
      message: '이미지가 성공적으로 업로드되었습니다.',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: '이미지 업로드에 실패했습니다.',
    };
  }
}
