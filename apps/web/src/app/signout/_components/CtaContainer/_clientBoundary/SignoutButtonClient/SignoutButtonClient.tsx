'use client';

import Button from '@/components/buttons/button/Button';

export default function SignoutButtonClient() {
  const handleSignout = () => {
    // TODO: 탈퇴 로직 구현
  };

  return (
    <Button
      text="로킷 탈퇴하기"
      onClick={handleSignout}
      size="large"
      variant="danger"
      style={{ width: '100%' }}
    />
  );
}
