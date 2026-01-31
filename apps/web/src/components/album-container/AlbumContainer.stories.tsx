import type { Meta, StoryObj } from '@storybook/react';
import AlbumContainer from './AlbumContainer';

const meta: Meta<typeof AlbumContainer> = {
  title: 'Components/AlbumContainer',
  component: AlbumContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#242426' }],
    },
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof AlbumContainer>;

const mockThumbnailUrl = ['https://picsum.photos/200/200?random=1'];

export const Medium: Story = {
  args: {
    title: '우리의 추억',
    type: 'medium',
    thumbnailUrls: mockThumbnailUrl,
    photoCount: 6,
  },
};

export const Small: Story = {
  args: {
    title: '우리의 추억',
    type: 'small',
    thumbnailUrls: mockThumbnailUrl,
    photoCount: 6,
  },
};

export const FewPhotos: Story = {
  args: {
    title: '짧은 여행',
    type: 'medium',
    thumbnailUrls: mockThumbnailUrl,
    photoCount: 2,
  },
};

export const ManyPhotos: Story = {
  args: {
    title: '긴 여행',
    type: 'medium',
    thumbnailUrls: mockThumbnailUrl,
    photoCount: 10,
  },
};

export const NoThumbnail: Story = {
  args: {
    title: '빈 앨범',
    type: 'medium',
    thumbnailUrls: undefined,
    photoCount: 0,
  },
};
