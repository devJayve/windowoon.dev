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
import { FieldError, useForm } from 'react-hook-form';
import { cn } from '@/shared/lib/cn';
import { motion } from 'framer-motion';
import { useModal } from '@/shared/provider/ModalProvider';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface GuestFormData {
  name: string;
  password: string;
}

export function GuestFormDialog() {
  const { closeModal } = useModal();
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
  const [showPassword, setShowPassword] = useState(false);
  const nameValidPattern = /^[가-힣a-zA-Z0-9_\-.]+$/;
  const passwordValidPattern = /^[a-zA-Z0-9_\-.]+$/;

  const onSubmit = (data: GuestFormData) => {
    reset();
    closeModal(data);
  };

  const handleCancel = () => {
    reset();
    closeModal(false);
  };

  return (
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
              minLength: {
                value: 2,
                message: '이름은 2자 이상이어야 합니다.',
              },
              validate: {
                notValid: value =>
                  nameValidPattern.test(value) ||
                  '이름은 영문, 숫자, 특수문자(_-.)만 사용 가능합니다.',
              },
            })}
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          <FormErrorMessage error={errors.name} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">비밀번호</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              maxLength={30}
              className={cn(errors.password && 'border-red-500')}
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 4,
                  message: '비밀번호는 4자 이상이어야 합니다.',
                },
                validate: {
                  notValid: value =>
                    passwordValidPattern.test(value) ||
                    '비밀번호는 영문, 숫자, 특수문자(_-.)만 사용 가능합니다.',
                },
              })}
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center px-3 hover:text-neutral-300"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <FormErrorMessage error={errors.password} />
        </div>

        <DialogFooter className="gap-2">
          <Button onClick={handleCancel} type="button" variant="outline">
            취소
          </Button>
          <Button type="submit">작성 완료</Button>
        </DialogFooter>
      </form>
    </DialogContent>
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
