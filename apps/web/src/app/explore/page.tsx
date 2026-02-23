'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
const toolsImage = '/tools_3d.png';
import MenuHeader from '@/components/header/menu/MenuHeader';
import * as S from './page.styles';

const ExplorePage = () => {
  const router = useRouter();

  return (
    <S.Wrapper>
      <MenuHeader title="탐색" onClickBack={() => router.back()} showMenu={false} />
      <S.Content>
        <S.InnerContent>
          <Image src={toolsImage} alt="준비중" width={130} height={126} />
          <S.TextGroup>
            <S.Title>아직 오픈 전이에요 👀</S.Title>
            <S.Subtitle>새로운 서비스를 곧 공개할 예정이에요</S.Subtitle>
          </S.TextGroup>
        </S.InnerContent>
      </S.Content>
    </S.Wrapper>
  );
};

export default ExplorePage;
