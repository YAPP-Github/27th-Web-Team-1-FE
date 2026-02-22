'use client';

import { useRouter } from 'next/navigation';
import DefaultHeader from '@/components/header/default/DefaultHeader';
import { PAGE_TITLE } from '../../constants';

export default function HeaderClient() {
  const router = useRouter();

  return (
    <DefaultHeader
      title={PAGE_TITLE}
      onClickBack={() => router.back()}
      backButtonVariant="circle"
    />
  );
}
