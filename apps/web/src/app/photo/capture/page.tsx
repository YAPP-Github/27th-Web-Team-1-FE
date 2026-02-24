'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ChevronLeftIcon from '@/assets/images/chevronLeft.svg';
import { ROUTES } from '@/constants';
import { CAMERA } from './_constants';
import { usePhotoContext } from '../_contexts/PhotoContext';
import { dataUrlToSelectedPhoto } from '../add/_utils/dataUrlToSelectedPhoto';
import * as S from './page.styles';

type CameraFacing = 'user' | 'environment';

export default function PhotoCapturePage() {
  const router = useRouter();
  const { addPhotos, setSelectedPhoto, setInitialAlbumId, resetPhotoNoteState } =
    usePhotoContext();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<CameraFacing>('environment');
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    stopCamera();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: CAMERA.VIDEO_WIDTH },
          height: { ideal: CAMERA.VIDEO_HEIGHT },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsLoading(false);
    } catch (err) {
      // play() 요청이 새로운 load로 중단된 경우 무시
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      console.error('Camera error:', err);
      setError('카메라에 접근할 수 없습니다. 카메라 권한을 확인해주세요.');
      setIsLoading(false);
    }
  }, [facingMode, stopCamera]);

  const getCurrentLocation = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          // 위치 정보를 가져올 수 없어도 촬영은 가능
        },
      );
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 카메라 초기화는 마운트 후 실행되어야 함
    startCamera();

    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const handleBack = useCallback(() => {
    stopCamera();
    router.back();
  }, [router, stopCamera]);

  const handleSwitchCamera = useCallback(() => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  }, []);

  const handleCapture = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 전면 카메라인 경우 좌우 반전
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL(CAMERA.IMAGE_TYPE, CAMERA.JPEG_QUALITY);
    const photo = await dataUrlToSelectedPhoto(dataUrl, currentLocation ?? undefined);

    if (photo) {
      addPhotos([photo]);
      setSelectedPhoto(photo);
      resetPhotoNoteState(photo);
      setInitialAlbumId(null);
      stopCamera();
      router.push(ROUTES.PHOTO.NOTE.ADD);
    }
  }, [
    facingMode,
    currentLocation,
    addPhotos,
    setSelectedPhoto,
    resetPhotoNoteState,
    setInitialAlbumId,
    stopCamera,
    router,
  ]);

  return (
    <S.Container>
      <S.Header>
        <S.BackButton type="button" onClick={handleBack}>
          <ChevronLeftIcon width={24} height={24} />
        </S.BackButton>
      </S.Header>

      <S.VideoContainer>
        {isLoading && <S.LoadingText>카메라 로딩 중...</S.LoadingText>}
        {error ? (
          <S.ErrorContainer>
            <S.ErrorText>{error}</S.ErrorText>
            <S.RetryButton type="button" onClick={startCamera}>
              다시 시도
            </S.RetryButton>
          </S.ErrorContainer>
        ) : (
          <S.Video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              transform: facingMode === 'user' ? 'scaleX(-1)' : 'none',
            }}
          />
        )}
      </S.VideoContainer>

      <S.Canvas ref={canvasRef} />

      {!error && (
        <S.Controls>
          <S.CaptureButton
            type="button"
            onClick={handleCapture}
            disabled={isLoading}
            aria-label="사진 촬영"
          />
          <S.SwitchCameraButton
            type="button"
            onClick={handleSwitchCamera}
            aria-label="카메라 전환"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8A5.87 5.87 0 016 12c0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" />
            </svg>
          </S.SwitchCameraButton>
        </S.Controls>
      )}
    </S.Container>
  );
}
