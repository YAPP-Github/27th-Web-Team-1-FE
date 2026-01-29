import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AlbumListContainer from './AlbumListContainer';

const meta: Meta<typeof AlbumListContainer> = {
  title: 'Components/AlbumListContainer',
  component: AlbumListContainer,
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
type Story = StoryObj<typeof AlbumListContainer>;

const mockAlbums = [
  {
    id: '1',
    title: '우리의 추억',
    thumbnail: 'https://picsum.photos/200/200?random=1',
    photoCount: 42,
  },
  {
    id: '2',
    title: '여행',
    thumbnail: 'https://picsum.photos/200/200?random=2',
    photoCount: 128,
  },
  {
    id: '3',
    title: '일상',
    thumbnail: 'https://picsum.photos/200/200?random=3',
    photoCount: 15,
  },
  {
    id: '4',
    title: '아주 긴 앨범 제목이 들어가는 경우',
    thumbnail: 'https://picsum.photos/200/200?random=4',
    photoCount: 7,
  },
];

const AlbumListContainerWithState = ({
  initialSelectedId = null,
}: {
  initialSelectedId?: string | null;
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId);

  return (
    <AlbumListContainer
      albums={mockAlbums}
      selectedAlbumId={selectedId}
      onSelectAlbum={setSelectedId}
    />
  );
};

export const Default: Story = {
  render: () => <AlbumListContainerWithState initialSelectedId={null} />,
};

export const WithSelection: Story = {
  render: () => <AlbumListContainerWithState initialSelectedId="2" />,
};
