/** 상태 소스 타입: 사진 추가(note) 또는 사진 수정(edit) */
export const STATE_SOURCE = {
  NOTE: 'note',
  EDIT: 'edit',
} as const;

export type StateSource = (typeof STATE_SOURCE)[keyof typeof STATE_SOURCE];
