import { ReactElement, ReactNode } from 'react';
import PopupRoot from '../PopupRoot';
import PopupLayer from '../PopupLayer';
import Backdrop from '../BackDrop';
import * as S from './Overlay.styles';

interface OverlayProps {
  /** 오버레이 열림 상태 */
  isOpen: boolean;
  /** 오버레이 닫는 함수 */
  onClose?: () => void;
  children?: ReactNode;
}

interface OverlayContentProps {
  children: React.ReactNode;
  height?: number;
}

type OverlayComponent = ((props: OverlayProps) => ReactElement | null) & {
  Content: (props: OverlayContentProps) => ReactElement;
  Footer: (props: { children: React.ReactNode }) => ReactElement;
};

const Overlay: OverlayComponent = ({ isOpen, onClose, children }: OverlayProps) => {
  if (!isOpen) return null;

  return (
    <PopupRoot>
      <Backdrop onClick={onClose} />
      <PopupLayer>{children}</PopupLayer>
    </PopupRoot>
  );
};

const OverlayContent = ({ children, height }: OverlayContentProps) => {
  return (
    <S.Content role="dialog" aria-modal="true" height={height}>
      {children}
    </S.Content>
  );
};

const OverlayFooter = ({ children }: { children: React.ReactNode }) => {
  return <S.Footer>{children}</S.Footer>;
};

Overlay.Content = OverlayContent;
Overlay.Footer = OverlayFooter;

export default Overlay;
