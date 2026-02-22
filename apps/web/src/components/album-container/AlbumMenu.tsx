import { useState } from 'react';
import MenuIcon from '@/assets/images/menu.svg';
import * as S from './AlbumMenu.styles';

interface AlbumMenuProps {
  onRename: () => void;
  onDelete: () => void;
}

const AlbumMenu = ({ onRename, onDelete }: AlbumMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    onRename();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    onDelete();
  };

  return (
    <S.Wrapper>
      <S.Button onClick={handleToggle}>
        <MenuIcon width={16} height={16} />
      </S.Button>
      {isOpen && (
        <>
          <S.Backdrop onClick={handleBackdropClick} />
          <S.Dropdown>
            <S.Item onClick={handleRename}>앨범 이름 변경</S.Item>
            <S.Item variant="danger" onClick={handleDelete}>
              앨범 삭제
            </S.Item>
          </S.Dropdown>
        </>
      )}
    </S.Wrapper>
  );
};

export default AlbumMenu;
