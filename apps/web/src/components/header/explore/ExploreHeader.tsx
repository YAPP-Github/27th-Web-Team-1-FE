import ExploreIcon from '@/assets/images/explore.svg';
import LocationIcon from '@/assets/images/location.svg';
import ProfileIcon from '@/assets/images/profile.svg';
import CircleButton from '@/components/buttons/circleButton/CircleButton';
import {
  BUTTON_SIZE,
  ICON_SIZE,
  PROFILE_ICON_SIZE,
  PROFILE_IMAGE_SIZE,
} from '../base/Header.constants';
import HeaderBase from '../base/HeaderBase';
import * as S from './ExploreHeader.styles';

export interface ExploreHeaderProps {
  /** 위치 타이틀 */
  title: string;
  /** 프로필 버튼 클릭 이벤트 */
  onClickProfile: () => void;
  /** 탐색 버튼 클릭 이벤트 */
  onClickExplore: () => void;
  /** 프로필 이미지 URL */
  profileImageSrc?: string;
}

const ExploreHeader = ({
  title,
  onClickProfile,
  onClickExplore,
  profileImageSrc,
}: ExploreHeaderProps) => {
  return (
    <HeaderBase
      left={
        <CircleButton
          onClick={onClickProfile}
          style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
        >
          {profileImageSrc ? (
            <S.ProfileImage
              src={profileImageSrc}
              alt="프로필"
              width={PROFILE_IMAGE_SIZE}
              height={PROFILE_IMAGE_SIZE}
            />
          ) : (
            <ProfileIcon
              width={PROFILE_ICON_SIZE}
              height={PROFILE_ICON_SIZE}
              style={{ display: 'block' }}
            />
          )}
        </CircleButton>
      }
      center={
        <S.LocationWrapper>
          <S.LocationIconWrapper>
            <LocationIcon width={16} height={16} />
          </S.LocationIconWrapper>
          <S.LocationText>{title}</S.LocationText>
        </S.LocationWrapper>
      }
      right={
        <CircleButton
          onClick={onClickExplore}
          style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
        >
          <ExploreIcon width={ICON_SIZE} height={ICON_SIZE} />
        </CircleButton>
      }
    />
  );
};

export default ExploreHeader;
