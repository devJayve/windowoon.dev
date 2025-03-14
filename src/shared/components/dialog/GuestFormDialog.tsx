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
import { FieldError, useForm } from 'react-hook-form';
import { cn } from '@/shared/lib/cn';
import { motion } from 'framer-motion';

interface GuestFormData {
  name: string;
  password: string;
}

export function GuestFormDialog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GuestFormData>({
    defaultValues: {
      name: '',
      password: '',
    },
  });

  const onSubmit = (data: GuestFormData) => {
    console.log(data);
    reset();
  };

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>비회원 댓글 작성</DialogTitle>
          <DialogDescription>
            비회원으로 댓글을 작성 시 사용할 이름과 비밀번호를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              maxLength={15}
              className={cn(errors.name && 'border-red-500')}
              {...register('name', {
                required: '이름을 입력해주세요.',
              })}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            <FormErrorMessage error={errors.name} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              maxLength={30}
              className={cn(errors.password && 'border-red-500')}
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 4,
                  message: '비밀번호는 4자 이상이어야 합니다.',
                },
              })}
            />
            <FormErrorMessage error={errors.password} />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline">
              취소
            </Button>
            <Button type="submit">작성 완료</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FormErrorMessage({ error }: { error?: FieldError | null }) {
  return (
    <div
      className={`text-sm font-light text-red-400 transition-all duration-300 ${
        error ? 'mt-1 max-h-10 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
      }`}
    >
      {error && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-light text-red-400"
        >
          {error.message}
        </motion.span>
      )}
    </div>
  );
}
