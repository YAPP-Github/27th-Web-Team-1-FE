import PopupRoot from '../PopupRoot';
import PopupLayer from '../PopupLayer';
import Backdrop from '../BackDrop';
import * as S from './Modal.styles';
import { ReactElement } from 'react';

interface ModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean;
  /** 모달 닫는 함수 */
  onClose: () => void;
  children: React.ReactNode;
}

interface ModalContentProps {
  children: React.ReactNode;
}

type ModalComponent = ((props: ModalProps) => ReactElement | null) & {
  Content: (props: ModalContentProps) => ReactElement;
  Footer: (props: { children: React.ReactNode }) => ReactElement;
};

const Modal: ModalComponent = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <PopupRoot>
      <Backdrop onClick={onClose} />
      <PopupLayer>{children}</PopupLayer>
    </PopupRoot>
  );
};

const ModalContent = ({ children }: ModalContentProps) => {
  return (
    <S.Content role="dialog" aria-modal="true">
      {children}
    </S.Content>
  );
};

const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return <S.Footer>{children}</S.Footer>;
};

Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
