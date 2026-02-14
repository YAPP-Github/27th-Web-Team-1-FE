'use client';

import { AnimatePresence } from 'framer-motion';
import * as S from './CrossfadeText.styles';

interface CrossfadeTextProps {
  text: string;
  className?: string;
}

const CrossfadeText = ({ text, className }: CrossfadeTextProps) => {
  return (
    <S.Container className={className}>
      <AnimatePresence mode="popLayout" initial={false}>
        <S.MotionText
          key={text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, position: 'absolute', top: 0, left: 0, right: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {text}
        </S.MotionText>
      </AnimatePresence>
    </S.Container>
  );
};

export default CrossfadeText;
