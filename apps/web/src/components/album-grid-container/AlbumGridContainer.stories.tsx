import type { Meta, StoryObj } from '@storybook/react';
import AlbumGridContainer from './AlbumGridContainer';
import AlbumContainer from '../album-container/AlbumContainer';

const meta: Meta<typeof AlbumGridContainer> = {
  title: 'Components/AlbumGridContainer',
  component: AlbumGridContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#242426' }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlbumGridContainer>;

const mockPhotos = [
  { photoId: '1', src: 'https://picsum.photos/200/200?random=1' },
  { photoId: '2', src: 'https://picsum.photos/200/200?random=2' },
  { photoId: '3', src: 'https://picsum.photos/200/200?random=3' },
  { photoId: '4', src: 'https://picsum.photos/200/200?random=4' },
  { photoId: '5', src: 'https://picsum.photos/200/200?random=5' },
  { photoId: '6', src: 'https://picsum.photos/200/200?random=6' },
];

export const Default: Story = {
  render: () => (
    <AlbumGridContainer>
      <AlbumContainer title="우리의 추억" photoList={mockPhotos} photoCount={6} />
      <AlbumContainer
        title="여름 휴가"
        photoList={mockPhotos.slice(0, 4)}
        photoCount={4}
      />
      <AlbumContainer
        title="겨울 여행"
        photoList={mockPhotos.slice(0, 2)}
        photoCount={2}
      />
      <AlbumContainer title="봄 소풍" photoList={mockPhotos} photoCount={10} />
    </AlbumGridContainer>
  ),
};
