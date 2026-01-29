'use client';

import Overlay from '@/components/popup/overlay/Overlay';
import TextButton from '@/components/buttons/textButton/TextButton';
import Input from '@/components/input/Input';
import { INPUT_TYPE } from '@/components/input/Input.constants';
import AlbumListContainer from '@/components/album-list-container/AlbumListContainer';
import { SelectableAlbum } from '@/types/album.type';
import * as S from './AlbumSelectOverlay.styles';

interface AlbumSelectOverlayProps {
  isOpen: boolean;
  albums: SelectableAlbum[];
  isLoading: boolean;
  selectedAlbumId: string | null;
  searchQuery: string;
  onChangeSearchQuery: (value: string) => void;
  onSelectAlbum: (albumId: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const AlbumSelectOverlay = ({
  isOpen,
  albums,
  isLoading,
  selectedAlbumId,
  searchQuery,
  onChangeSearchQuery,
  onSelectAlbum,
  onClose,
  onSubmit,
}: AlbumSelectOverlayProps) => {
  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <Overlay.Content>
        <S.SearchAlbumWrapper>
          <Input
            type={INPUT_TYPE.SEARCH}
            value={searchQuery}
            onChange={onChangeSearchQuery}
            placeholder="앨범을 검색해보세요..."
            showCharCount={false}
          />
          <S.AlbumListWrapper>
            {(() => {
              if (isLoading) {
                return <S.LoadingText>로딩 중...</S.LoadingText>;
              }
              if (albums.length === 0) {
                return <S.EmptyText>앨범이 없습니다</S.EmptyText>;
              }
              return (
                <AlbumListContainer
                  albums={albums}
                  selectedAlbumId={selectedAlbumId}
                  onSelectAlbum={onSelectAlbum}
                />
              );
            })()}
          </S.AlbumListWrapper>
        </S.SearchAlbumWrapper>
        <Overlay.Footer>
          <TextButton text="닫기" onClick={onClose} style={{ flex: 1 }} />
          <TextButton
            text="앨범 선택"
            variant="primary"
            onClick={onSubmit}
            disabled={!selectedAlbumId}
            style={{ flex: 1 }}
          />
        </Overlay.Footer>
      </Overlay.Content>
    </Overlay>
  );
};

export default AlbumSelectOverlay;
