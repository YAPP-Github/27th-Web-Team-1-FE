import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AlbumRow from './AlbumRow';

const meta: Meta<typeof AlbumRow> = {
  title: 'Components/AlbumRow',
  component: AlbumRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#242426' }],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AlbumRow>;

const AlbumRowWithState = ({
  title,
  thumbnail,
  photoCount,
  initialSelected = false,
}: {
  title: string;
  thumbnail: string;
  photoCount: number;
  initialSelected?: boolean;
}) => {
  const [isSelected, setIsSelected] = useState(initialSelected);

  return (
    <AlbumRow
      title={title}
      thumbnail={thumbnail}
      photoCount={photoCount}
      onClick={() => setIsSelected(!isSelected)}
      isSelected={isSelected}
    />
  );
};

export const Default: Story = {
  render: () => (
    <AlbumRowWithState
      title="우리의 추억"
      thumbnail="https://picsum.photos/200/200?random=1"
      photoCount={42}
      initialSelected={false}
    />
  ),
};

export const Selected: Story = {
  render: () => (
    <AlbumRowWithState
      title="우리의 추억"
      thumbnail="https://picsum.photos/200/200?random=1"
      photoCount={42}
      initialSelected={true}
    />
  ),
};

export const LongTitle: Story = {
  render: () => (
    <AlbumRowWithState
      title="아주 긴 앨범 제목이 들어가는 경우 어떻게 보이는지 테스트"
      thumbnail="https://picsum.photos/200/200?random=2"
      photoCount={128}
      initialSelected={false}
    />
  ),
};
