import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/dialog/dialog';
import { Input } from '@/shared/components/input/Input';
import { Label } from '@/shared/components/form/label';
import { Button } from '@/shared/components/button/button';
import { useState } from 'react';

export function GuestFormDialog() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>비회원 댓글 작성</DialogTitle>
          <DialogDescription>
            비회원으로 댓글을 작성 시 사용할 이름과 비밀번호를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value || '')}
              maxLength={15}
              required
            />
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={password}
              maxLength={30}
              onChange={e => setPassword(e.target.value || '')}
              required
            />
          </div>
        </form>
        <DialogFooter>
          <Button type="button" variant="outline">
            취소
          </Button>
          <Button type="submit">작성 완료</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
