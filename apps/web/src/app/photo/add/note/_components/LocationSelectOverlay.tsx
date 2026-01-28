'use client';

import Overlay from '@/components/popup/overlay/Overlay';
import TextButton from '@/components/buttons/textButton/TextButton';
import Input from '@/components/input/Input';
import { INPUT_TYPE } from '@/components/input/Input.constants';
import { PlaceResponse } from '@repo/api-client';
import CheckIcon from '@/assets/images/check.svg';
import * as S from './LocationSelectOverlay.styles';

interface LocationSelectOverlayProps {
  isOpen: boolean;
  locations: PlaceResponse[];
  isLoading: boolean;
  selectedLocationId: string | null;
  searchQuery: string;
  onChangeSearchQuery: (value: string) => void;
  onSelectLocation: (locationId: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const LocationSelectOverlay = ({
  isOpen,
  locations,
  isLoading,
  selectedLocationId,
  searchQuery,
  onChangeSearchQuery,
  onSelectLocation,
  onClose,
  onSubmit,
}: LocationSelectOverlayProps) => {
  const getLocationId = (location: PlaceResponse) =>
    `${location.longitude}-${location.latitude}`;

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <Overlay.Content>
        <S.SearchLocationWrapper>
          <Input
            type={INPUT_TYPE.SEARCH}
            value={searchQuery}
            onChange={onChangeSearchQuery}
            placeholder="위치를 검색해보세요..."
            showCharCount={false}
          />
          <S.LocationListWrapper>
            {(() => {
              if (isLoading) {
                return <S.LoadingText>근처 검색...</S.LoadingText>;
              }
              if (locations.length === 0) {
                return <S.EmptyText>검색 결과가 없습니다</S.EmptyText>;
              }
              return (
                <S.LocationListContainer>
                  {locations.map((location) => (
                    <S.LocationItem
                      key={getLocationId(location)}
                      onClick={() => onSelectLocation(getLocationId(location))}
                    >
                      <S.LocationInfo>
                        <S.LocationTitle>{location.placeName}</S.LocationTitle>
                        <S.LocationDetail>
                          {location.roadAddress || location.address}
                        </S.LocationDetail>
                      </S.LocationInfo>
                      {selectedLocationId === getLocationId(location) && (
                        <S.CheckIcon>
                          <CheckIcon width={16} height={16} />
                        </S.CheckIcon>
                      )}
                    </S.LocationItem>
                  ))}
                </S.LocationListContainer>
              );
            })()}
          </S.LocationListWrapper>
        </S.SearchLocationWrapper>
        <Overlay.Footer>
          <TextButton text="닫기" onClick={onClose} style={{ flex: 1 }} />
          <TextButton
            text="위치 추가"
            variant="primary"
            onClick={onSubmit}
            disabled={!selectedLocationId}
            style={{ flex: 1 }}
          />
        </Overlay.Footer>
      </Overlay.Content>
    </Overlay>
  );
};

export default LocationSelectOverlay;
