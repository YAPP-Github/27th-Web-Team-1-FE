import LocationIcon from '@/assets/images/location.svg';
import { ReactNode } from 'react';
import * as B from '../base/Header.styles';
import * as E from '../explore/ExploreHeader.styles';
import * as S from './PhotoAddHeader.styles';

export interface PhotoAddHeaderProps {
  /** 왼쪽 영역 (닫기 버튼) */
  left?: ReactNode;
  /** 위치 텍스트 */
  locationText?: string;
  /** 위치 정보 로딩 중 여부 */
  isLoading?: boolean;
  /** 위치 정보 존재 여부 */
  hasLocation?: boolean;
  /** 위치 텍스트 클릭 시 콜백 */
  onClickLocation?: () => void;
}

const PhotoAddHeader = ({
  left,
  locationText,
  isLoading,
  hasLocation,
  onClickLocation,
}: PhotoAddHeaderProps) => {
  const renderLocationDisplay = () => {
    if (isLoading) {
      return <E.LocationText>위치 정보 불러오는 중...</E.LocationText>;
    }

    if (hasLocation && locationText) {
      return (
        <E.LocationWrapper>
          <E.LocationIconWrapper>
            <LocationIcon width={16} height={16} />
          </E.LocationIconWrapper>
          <E.LocationText>{locationText}</E.LocationText>
        </E.LocationWrapper>
      );
    }

    return <E.LocationText>위치 추가...</E.LocationText>;
  };

  return (
    <S.Container>
      <B.LeftSection>{left}</B.LeftSection>
      <B.CenterSection
        onClick={onClickLocation}
        style={onClickLocation ? { cursor: 'pointer' } : undefined}
      >
        {renderLocationDisplay()}
      </B.CenterSection>
      <B.RightSection />
    </S.Container>
  );
};

export default PhotoAddHeader;
