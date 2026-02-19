import { useState, type MouseEvent } from 'react';
import * as S from './PhotoGridItem.styles';

export interface PhotoGridItemProps {
  /** 이미지 alt 텍스트 */
  alt?: string;
  /** 이미지 src URL */
  src: string;
  /** ISO 8601 형식의 날짜 문자열 (있으면 배지 표시) */
  date?: string;
  /** 클릭 이벤트 */
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  /** 업로드 진행률 (0~100). undefined면 오버레이 숨김 */
  progress?: number;
  /** 업로드 에러 상태 */
  hasError?: boolean;
}

const PhotoGridItem = ({
  alt = '',
  src,
  date,
  onClick,
  progress,
  hasError: uploadError,
}: PhotoGridItemProps) => {
  const [hasError, setHasError] = useState(false);

  const dateObj = date ? new Date(date) : null;
  const day = dateObj?.getDate();
  const month = dateObj ? dateObj.getMonth() + 1 : null;

  const showFallback = hasError || !src;
  const showProgress = progress !== undefined && !uploadError;

  return (
    <S.Container type="button" onClick={onClick}>
      {showFallback ? (
        <S.Fallback>{alt}</S.Fallback>
      ) : (
        <S.Photo src={src} alt={alt} onError={() => setHasError(true)} />
      )}
      {showProgress && (
        <S.ProgressOverlay>
          <S.ProgressBarTrack>
            <S.ProgressBarFill style={{ width: `${progress}%` }} />
          </S.ProgressBarTrack>
        </S.ProgressOverlay>
      )}
      {uploadError && (
        <S.ErrorOverlay>
          <S.ErrorText>!</S.ErrorText>
        </S.ErrorOverlay>
      )}
      {dateObj && (
        <S.DateBadge>
          <S.Day>{day}</S.Day>
          <S.Month>{month}월</S.Month>
        </S.DateBadge>
      )}
    </S.Container>
  );
};

export default PhotoGridItem;
