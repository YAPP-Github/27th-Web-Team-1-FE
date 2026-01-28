import { useState } from 'react';
import * as S from './MenuButton.styles';

interface MenuButtonProps {
  /** 열림 상태에 따라 트리거를 렌더링 */
  triggerIcon: (isOpen: boolean) => React.ReactNode;
  /** 메뉴 닫힐 때 실행 */
  onClose?: () => void;
  /** 메뉴 아이템 영역 */
  children: React.ReactNode;
}

const MenuButton = ({ triggerIcon, onClose, children }: MenuButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <S.Container>
      <S.TriggerButton
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        {triggerIcon(isOpen)}
      </S.TriggerButton>

      {isOpen && (
        <>
          <S.Backdrop onClick={handleClose} />
          <S.MenuPanel role="menu">{children}</S.MenuPanel>
        </>
      )}
    </S.Container>
  );
};

export default MenuButton;
