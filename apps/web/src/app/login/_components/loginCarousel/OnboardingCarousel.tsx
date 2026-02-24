'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Lock3dIcon from '@/assets/images/lock_3d.svg';
import Pin3dIcon from '@/assets/images/pin_3d.svg';
import Puzzle3dIcon from '@/assets/images/puzzle_3d.svg';
import Location3dIcon from '@/assets/images/location_3d.svg';
import ChevronLeftIcon from '@/assets/images/chevronLeft.svg';
import ChevronRightIcon from '@/assets/images/chevronRight.svg';
import * as S from './OnboardingCarousel.styles';

const SLIDES = [
  {
    icon: Lock3dIcon,
    title: '우리만의 이야기를,\n지도에 Lokit',
    description: null,
  },
  {
    icon: Location3dIcon,
    title: '추억을 장소로 남겨요',
    description: '소중한 사람들과 함께한 추억들을\n지도에 기록하고, 한 눈에 모아보세요.',
  },
  {
    icon: Puzzle3dIcon,
    title: '둘만의 지도를 완성해요',
    description: '사진이 많이 쌓일수록,\n둘만의 이야기가 선명해져요.',
  },
  {
    icon: Pin3dIcon,
    title: '순간을 놓치지 마세요',
    description: '사진 한 장이면 충분해요.\n장소와 함께 추억을 기억하세요.',
  },
];

const CAROUSEL_SLIDES = [SLIDES[3], ...SLIDES, SLIDES[0]];

export default function OnboardingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 자동 재생 시작
  const startAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);
  }, []);

  // 정상 범위 내에 있을 때 애니메이션 활성화 (렌더 중 상태 조정 패턴)
  const [prevCurrentIndex, setPrevCurrentIndex] = useState(currentIndex);
  if (prevCurrentIndex !== currentIndex) {
    setPrevCurrentIndex(currentIndex);
    if (currentIndex >= 1 && currentIndex <= 4) {
      setIsTransitioning(true);
    }
  }

  // 인덱스 보정 로직 (무한 루프 핵심)
  useEffect(() => {
    // 마지막 클론 슬라이드(index 5)에 도달했을 때
    if (currentIndex === 5) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500);
      return () => clearTimeout(timer);
    }

    // 첫 번째 클론 슬라이드(index 0)에 도달했을 때
    if (currentIndex === 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(4);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // 자동 재생 시작 및 정리
  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [startAutoPlay]);

  // 이전 슬라이드
  const handlePrevious = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    startAutoPlay();
  }, [startAutoPlay]);

  // 다음 슬라이드
  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    startAutoPlay();
  }, [startAutoPlay]);

  const getDotIndex = () => {
    if (currentIndex === 0) return 3;
    if (currentIndex === 5) return 0;
    return currentIndex - 1;
  };

  return (
    <S.Wrapper>
      <S.DotContainer>
        {SLIDES.map((_, idx) => (
          <S.Dot key={idx} isActive={getDotIndex() === idx} />
        ))}
      </S.DotContainer>

      <S.CarouselWrapper>
        <S.ButtonPrev onClick={handlePrevious}>
          <ChevronLeftIcon />
        </S.ButtonPrev>

        <S.CarouselContainer
          ref={containerRef}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
          }}
        >
          {CAROUSEL_SLIDES.map((slide, idx) => (
            <S.Slide key={idx}>
              <S.Content>
                <S.Title>{slide.title}</S.Title>
                {slide.description && <S.Description>{slide.description}</S.Description>}
              </S.Content>
              <S.IconWrapper>
                <slide.icon />
              </S.IconWrapper>
            </S.Slide>
          ))}
        </S.CarouselContainer>

        <S.ButtonNext onClick={handleNext}>
          <ChevronRightIcon />
        </S.ButtonNext>
      </S.CarouselWrapper>
    </S.Wrapper>
  );
}
