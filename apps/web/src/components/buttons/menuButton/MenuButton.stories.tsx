import type { Meta, StoryObj } from '@storybook/react';
import MenuButton from './MenuButton';
import TextButton from '../textButton/TextButton';
import AddIcon from '@/assets/images/add.svg';

const meta: Meta<typeof MenuButton> = {
  title: 'Components/MenuButton',
  component: MenuButton,
};

export default meta;

type Story = StoryObj<typeof MenuButton>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 40,
      }}
    >
      <MenuButton triggerIcon={() => <AddIcon />}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <TextButton text="사진 추가" onClick={() => {}} />
          <TextButton text="앨범 추가" onClick={() => {}} />
          <TextButton text="삭제하기" onClick={() => {}} variant="negative" />
          <TextButton text="저장하기" onClick={() => {}} variant="primary" />
        </div>
      </MenuButton>
    </div>
  ),
};

export const withRotate: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 40,
      }}
    >
      <MenuButton
        triggerIcon={(isOpen) => (
          <AddIcon
            style={{
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          />
        )}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <TextButton text="사진 추가" onClick={() => {}} />
          <TextButton text="앨범 추가" onClick={() => {}} />
          <TextButton text="삭제하기" onClick={() => {}} variant="negative" />
          <TextButton text="저장하기" onClick={() => {}} variant="primary" />
        </div>
      </MenuButton>
    </div>
  ),
};
