'use server';
import { put } from '@vercel/blob';
import { ServerActionState } from '@/features/comment/types';

export interface ImageUploadResult {
  url: string;
  filename: string;
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
    const result = await put(image.name, image, {
      access: 'public',
    });

    return {
      data: { url: result.url, filename: image.name },
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
