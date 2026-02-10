'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { SelectedPhoto } from '../add/_types/photo';

export interface PhotoRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/** 사진 정보 기입 화면의 상태 (지도뷰 미리보기 이동 시에도 유지) */
export interface PhotoNoteState {
  memo: string;
  selectedAlbum: { id: number; title: string } | null;
  selectedLocation: {
    latitude: number;
    longitude: number;
    address?: string;
    roadAddress?: string;
    placeName?: string;
  } | null;
}

/**
 * TODO: 기능이 복잡해지면 PhotoAnimationContext로 분리 고려
 * - selectedPhotoRect, setSelectedPhotoRect는 UI 애니메이션 전용 상태
 * - 현재는 데이터 상태(photos, selectedPhoto)와 UI 상태가 혼재됨
 * - 불필요한 리렌더링 방지를 위해 데이터/UI 상태 분리 권장
 */
interface PhotoContextValue {
  /** 불러온 사진 목록 */
  photos: SelectedPhoto[];
  /** 사진 목록에 추가 */
  addPhotos: (photos: SelectedPhoto[]) => void;
  /** 선택한 사진 */
  selectedPhoto: SelectedPhoto | null;
  /** 사진 선택 */
  setSelectedPhoto: (photo: SelectedPhoto | null) => void;
  /** 선택한 사진의 위치 정보 (애니메이션용) - UI 상태 */
  selectedPhotoRect: PhotoRect | null;
  /** 선택한 사진 위치 설정 - UI 상태 */
  setSelectedPhotoRect: (rect: PhotoRect | null) => void;
  /** 사진 추가 시 기본으로 선택할 앨범 ID */
  initialAlbumId: number | null;
  /** 기본 앨범 ID 설정 */
  setInitialAlbumId: (albumId: number | null) => void;
  /** 사진 정보 기입 화면의 상태 */
  photoNoteState: PhotoNoteState;
  /** 사진 정보 기입 상태 업데이트 */
  updatePhotoNoteState: (state: Partial<PhotoNoteState>) => void;
  /** 사진 정보 기입 상태 초기화 (사진의 위치 정보가 있으면 그걸로 초기화) */
  resetPhotoNoteState: (photo?: SelectedPhoto) => void;
  /** 사진 수정 화면의 상태 */
  photoEditState: PhotoNoteState;
  /** 사진 수정 상태 업데이트 */
  updatePhotoEditState: (state: Partial<PhotoNoteState>) => void;
  /** 사진 수정 상태 초기화 */
  initPhotoEditState: (state: Partial<PhotoNoteState>) => void;
  /** 수정 중인 사진 ID (지도뷰 미리보기 이동 시에도 유지) */
  editingPhotoId: number | null;
  /** 수정 중인 사진 ID 설정 */
  setEditingPhotoId: (photoId: number | null) => void;
  /** 사진 수정 상태 초기화 완료 여부 */
  isEditStateInitialized: boolean;
}

const PhotoContext = createContext<PhotoContextValue | null>(null);

const initialPhotoNoteState: PhotoNoteState = {
  memo: '',
  selectedAlbum: null,
  selectedLocation: null,
};

export function PhotoProvider({ children }: { children: ReactNode }) {
  const [photos, setPhotos] = useState<SelectedPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhoto | null>(null);
  const [selectedPhotoRect, setSelectedPhotoRect] = useState<PhotoRect | null>(null);
  const [initialAlbumId, setInitialAlbumId] = useState<number | null>(null);
  const [photoNoteState, setPhotoNoteState] =
    useState<PhotoNoteState>(initialPhotoNoteState);
  const [photoEditState, setPhotoEditState] =
    useState<PhotoNoteState>(initialPhotoNoteState);
  const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null);
  const [isEditStateInitialized, setIsEditStateInitialized] = useState(false);

  const addPhotos = useCallback((newPhotos: SelectedPhoto[]) => {
    setPhotos((prev) => [...prev, ...newPhotos]);
  }, []);

  const updatePhotoNoteState = useCallback((state: Partial<PhotoNoteState>) => {
    setPhotoNoteState((prev) => ({ ...prev, ...state }));
  }, []);

  const resetPhotoNoteState = useCallback((photo?: SelectedPhoto) => {
    setPhotoNoteState({
      memo: '',
      selectedAlbum: null,
      selectedLocation: photo?.location
        ? {
            latitude: photo.location.latitude,
            longitude: photo.location.longitude,
          }
        : null,
    });
  }, []);

  const updatePhotoEditState = useCallback((state: Partial<PhotoNoteState>) => {
    setPhotoEditState((prev) => ({ ...prev, ...state }));
  }, []);

  const initPhotoEditState = useCallback((state: Partial<PhotoNoteState>) => {
    setPhotoEditState({ ...initialPhotoNoteState, ...state });
    // 실제 데이터가 있으면 초기화 완료로 표시, 빈 객체면 리셋
    const hasData =
      (state.memo !== undefined && state.memo !== '') ||
      state.selectedAlbum !== undefined ||
      state.selectedLocation !== undefined;
    setIsEditStateInitialized(hasData);
  }, []);

  const value = useMemo(
    () => ({
      photos,
      addPhotos,
      selectedPhoto,
      setSelectedPhoto,
      selectedPhotoRect,
      setSelectedPhotoRect,
      initialAlbumId,
      setInitialAlbumId,
      photoNoteState,
      updatePhotoNoteState,
      resetPhotoNoteState,
      photoEditState,
      updatePhotoEditState,
      initPhotoEditState,
      editingPhotoId,
      setEditingPhotoId,
      isEditStateInitialized,
    }),
    [
      photos,
      addPhotos,
      selectedPhoto,
      selectedPhotoRect,
      initialAlbumId,
      photoNoteState,
      updatePhotoNoteState,
      resetPhotoNoteState,
      photoEditState,
      updatePhotoEditState,
      initPhotoEditState,
      editingPhotoId,
      isEditStateInitialized,
    ],
  );

  return <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>;
}

export function usePhotoContext() {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotoContext must be used within PhotoProvider');
  }
  return context;
}
