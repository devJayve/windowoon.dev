import { put } from '@vercel/blob';

export async function uploadToStorage(file: File) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  const extension = file.name.split('.').pop();
  const filename = `image_${timestamp}-${random}.${extension}`;

  const result = await put(filename, file, {
    access: 'public',
  });

  return { url: result.url, filename };
}
