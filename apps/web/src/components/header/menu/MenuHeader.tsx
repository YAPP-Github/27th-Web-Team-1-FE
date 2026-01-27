import { createContext, ReactNode, useContext, useState } from 'react';
import ChevronLeftIcon from '@/assets/images/chevronLeft.svg';
import LocationIcon from '@/assets/images/location.svg';
import MenuIcon from '@/assets/images/menu.svg';
import CircleButton from '@/components/buttons/circleButton/CircleButton';
import { BUTTON_SIZE, ICON_SIZE } from '../base/Header.constants';
import HeaderBase from '../base/HeaderBase';
import * as S from './MenuHeader.styles';

interface MenuContextValue {
  isOpen: boolean;
  close: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('MenuHeader 컴포넌트 내부에서 사용해주세요.');
  }
  return context;
};

export interface MenuHeaderProps {
  /** 헤더 타이틀 */
  title: string;
  /** 뒤로가기 버튼 클릭 이벤트 */
  onClickBack: () => void;
  /** 자식 컴포넌트 (MenuHeader.Menu) */
  children?: ReactNode;
  /** 위치 아이콘 표시 여부 */
  showLocation?: boolean;
}

const MenuHeaderMain = ({
  title,
  onClickBack,
  children,
  showLocation,
}: MenuHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <MenuContext.Provider value={{ isOpen, close }}>
      <S.MenuHeaderWrapper>
        <HeaderBase
          left={
            <CircleButton
              onClick={onClickBack}
              style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
            >
              <ChevronLeftIcon width={ICON_SIZE} height={ICON_SIZE} />
            </CircleButton>
          }
          center={
            <S.CenterWrapper>
              {showLocation && (
                <S.LocationIconWrapper>
                  <LocationIcon width={16} height={16} />
                </S.LocationIconWrapper>
              )}
              {title && <S.Title>{title}</S.Title>}
            </S.CenterWrapper>
          }
          right={
            <CircleButton
              onClick={handleClickMenu}
              style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
            >
              <MenuIcon width={ICON_SIZE} height={ICON_SIZE} />
            </CircleButton>
          }
        />
        {children}
      </S.MenuHeaderWrapper>
    </MenuContext.Provider>
  );
};

interface MenuProps {
  children: ReactNode;
}

const Menu = ({ children }: MenuProps) => {
  const { isOpen } = useMenuContext();

  if (!isOpen) return null;

  return <S.MenuDropdown>{children}</S.MenuDropdown>;
};

export interface MenuItemProps {
  /** 메뉴 아이템 텍스트 */
  children: ReactNode;
  /** 클릭 이벤트 */
  onClick?: () => void;
  /** 텍스트 색상 */
  color?: string;
}

const MenuItem = ({ children, onClick, color }: MenuItemProps) => {
  const { close } = useMenuContext();

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <S.MenuItem onClick={handleClick} color={color}>
      {children}
    </S.MenuItem>
  );
};

const MenuHeader = Object.assign(MenuHeaderMain, {
  Menu,
  Item: MenuItem,
});

export default MenuHeader;
