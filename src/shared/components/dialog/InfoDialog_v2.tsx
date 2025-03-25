'use client';

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/dialog/dialog';
import { Button } from '@/shared/components/button/button';
import { Info } from 'lucide-react';
import { useModal } from '@/shared/provider/ModalProvider';

interface InfoDialogProps {
  title: string;
  description?: string;
  confirmText?: string;
}

export function InfoDialog({ title, description, confirmText = '확인' }: InfoDialogProps) {
  const { closeModal } = useModal();

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="flex flex-row items-center gap-4">
        <Info className="size-6 text-blue-500" />
        <div className="space-y-2">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </div>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={() => closeModal(true)}>{confirmText}</Button>
      </DialogFooter>
    </DialogContent>
  );
}
