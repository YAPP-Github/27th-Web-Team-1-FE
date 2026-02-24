'use client';

import Textarea from '@/components/textarea/Textarea';
import { useSignoutContext } from '@/app/signout/_contexts/SignoutContext';

export default function TextareaClient() {
  const { comment, setComment } = useSignoutContext();

  return (
    <Textarea
      value={comment}
      onChange={setComment}
      placeholder="자유롭게 적어주세요 (선택사항)"
    />
  );
}
