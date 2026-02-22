'use client';

import { useRouter } from 'next/navigation';
import DefaultHeader from '@/components/header/default/DefaultHeader';

export default function HeaderClient() {
  const router = useRouter();

  return (
    <DefaultHeader
      title="마이페이지"
      onClickBack={() => router.back()}
      backButtonVariant="circle"
    />
  );
}
