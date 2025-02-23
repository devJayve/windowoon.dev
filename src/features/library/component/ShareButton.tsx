'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/dialog/dialog';
import { Copy, ExternalLinkIcon } from 'lucide-react';
import { IconInstagram, IconKakao, IconTwitterX } from '@/shared/components/icons';
import { useEffect, useState } from 'react';

function ShareButton() {
  const [isNativeShareSupported, setIsNativeShareSupported] = useState(false);

  const handleShare = async () => {
    const title = '책1';
    const text = '책1을 공유합니다.';
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!!navigator.share) {
      setIsNativeShareSupported(true);
    }
  }, []);

  return isNativeShareSupported ? (
    <ExternalLinkIcon onClick={handleShare} size="18" />
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button">
          <ExternalLinkIcon size="18" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-lg">
        <DialogHeader>
          <DialogTitle>공유하기</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center gap-2 sm:items-start sm:justify-start">
          <button>
            <IconKakao height={40} />
          </button>
          <button>
            <IconTwitterX className="rounded-md border-0.5" height={40} />
          </button>
          <button>
            <IconInstagram height={40} />
          </button>
          <button className="flex size-10 items-center justify-center rounded-md border-0.5 bg-neutral-800">
            <Copy size="24" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShareButton;
