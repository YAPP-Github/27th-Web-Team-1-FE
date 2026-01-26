import { ReactNode } from 'react';
import * as S from './PhotoAddHeader.styles';
import LocationIcon from '@/assets/images/location.svg';

export interface PhotoAddHeaderProps {
  /** 왼쪽 영역 (닫기 버튼) */
  left?: ReactNode;
  /** 위치 텍스트 */
  locationText?: string;
  /** 위치 정보 로딩 중 여부 */
  isLoading?: boolean;
  /** 위치 정보 존재 여부 */
  hasLocation?: boolean;
}

const PhotoAddHeader = ({
  left,
  locationText,
  isLoading,
  hasLocation,
}: PhotoAddHeaderProps) => {
  const renderLocationDisplay = () => {
    if (isLoading) {
      return <S.LocationPlaceholder>위치 정보 불러오는 중...</S.LocationPlaceholder>;
    }

    if (hasLocation && locationText) {
      return (
        <>
          <S.LocationIcon>
            <LocationIcon width={16} height={16} />
          </S.LocationIcon>
          <S.LocationText>{locationText}</S.LocationText>
        </>
      );
    }

    return <S.LocationPlaceholder>위치 추가...</S.LocationPlaceholder>;
  };

  return (
    <S.Container>
      <S.LeftSection>{left}</S.LeftSection>
      <S.CenterSection>{renderLocationDisplay()}</S.CenterSection>
      <S.RightSection />
    </S.Container>
  );
};

export default PhotoAddHeader;
