'use client';

import { useEffect } from 'react';

export default function SignoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        gap: '16px',
      }}
    >
      <p style={{ color: '#999', fontSize: '16px' }}>페이지를 불러오지 못했어요</p>
      <button
        type="button"
        onClick={reset}
        style={{
          padding: '8px 20px',
          borderRadius: '8px',
          border: '1px solid #555',
          background: 'transparent',
          color: '#fff',
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
