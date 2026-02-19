'use client';

import AlbumListContainer from '@/components/album-list-container/AlbumListContainer';
import TextButton from '@/components/buttons/textButton/TextButton';
import Input from '@/components/input/Input';
import { INPUT_TYPE } from '@/components/input/Input.constants';
import Overlay from '@/components/popup/overlay/Overlay';
import type { SelectableAlbum } from '@repo/api-client';
import * as S from './AlbumSelectOverlay.styles';

interface AlbumSelectOverlayProps {
  isOpen: boolean;
  albums: SelectableAlbum[];
  isLoading: boolean;
  selectedAlbumId: number | null;
  searchQuery: string;
  onChangeSearchQuery: (value: string) => void;
  onSelectAlbum: (albumId: number) => void;
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
  const trimmedSearchQuery = searchQuery.trim();
  const hasSearchQuery = trimmedSearchQuery.length > 0;
  const hasNoAlbums = !hasSearchQuery && albums.length === 0;
  const isSearchResultEmpty = hasSearchQuery && albums.length === 0;

  return (
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      backdropStyle={{ background: 'rgba(0, 0, 0, 0.8)' }}
    >
      <Overlay.Content>
        <S.SearchAlbumWrapper>
          <Input
            type={INPUT_TYPE.SEARCH}
            value={searchQuery}
            onChange={onChangeSearchQuery}
            placeholder="앨범을 검색해보세요..."
            showCharCount={false}
            autoFocus
          />
          <S.AlbumListWrapper>
            {(() => {
              if (isLoading) {
                return <S.LoadingText>로딩 중...</S.LoadingText>;
              }
              if (hasNoAlbums) {
                return <S.EmptyText>앨범이 없습니다</S.EmptyText>;
              }
              if (isSearchResultEmpty) {
                return <S.EmptyText>검색 결과가 없어요</S.EmptyText>;
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
