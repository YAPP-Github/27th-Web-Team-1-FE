import { createPortal } from 'react-dom';
import * as S from './Popup.styles';

interface PopupRootProps {
  children: React.ReactNode;
}

const PopupRoot = ({ children }: PopupRootProps) => {
  return createPortal(<S.Root>{children}</S.Root>, document.body);
};

export default PopupRoot;
