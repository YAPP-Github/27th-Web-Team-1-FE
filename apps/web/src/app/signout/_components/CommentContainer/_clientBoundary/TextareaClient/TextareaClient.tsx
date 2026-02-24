'use client';

import { useState } from 'react';
import Textarea from '@/components/textarea/Textarea';

export default function TextareaClient() {
  const [value, setValue] = useState('');

  return (
    <Textarea
      value={value}
      onChange={setValue}
      placeholder="자유롭게 적어주세요 (선택사항)"
    />
  );
}
