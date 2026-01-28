'use client';

import { MenuHeader } from '@/components/header';

export default function TestMenuPage() {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%' }}>
      <MenuHeader title="앨범 이름" onClickBack={() => console.log('뒤로가기')}>
        <MenuHeader.Menu>
          <MenuHeader.Item onClick={() => console.log('편집')}>편집</MenuHeader.Item>
          <MenuHeader.Item onClick={() => console.log('삭제')} variant="danger">
            삭제
          </MenuHeader.Item>
        </MenuHeader.Menu>
      </MenuHeader>
    </div>
  );
}
