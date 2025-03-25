import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/dialog/dialog';
import { Input } from '@/shared/components/input/Input';
import { Label } from '@/shared/components/form/label';
import { Button } from '@/shared/components/button/button';
import { useModal } from '@/shared/provider/ModalProvider';
import { useRef, useState } from 'react';

export interface GuestConfirmData {
  password: string;
}

export function GuestConfirmDialog() {
  const { closeModal } = useModal();
  const formRef = useRef<HTMLFormElement>(null);
  const [password, setPassword] = useState('');

  const handleCancel = () => {
    closeModal(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    closeModal({ password: password });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>댓글 비밀번호 입력</DialogTitle>
        <DialogDescription>댓글 작성 시 설정한 비밀번호를 입력해주세요.</DialogDescription>
      </DialogHeader>
      <form ref={formRef} className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            maxLength={30}
            value={password}
            onChange={e => setPassword(e.target.value || '')}
          />
        </div>

        <DialogFooter className="gap-2">
          <Button onClick={handleCancel} type="button" variant="outline">
            취소
          </Button>
          <Button type="submit" disabled={password.length < 4}>
            확인
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
