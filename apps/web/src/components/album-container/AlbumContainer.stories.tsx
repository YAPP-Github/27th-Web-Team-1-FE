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

const mockPhotos = [
  { photoId: '1', src: 'https://picsum.photos/200/200?random=1' },
  { photoId: '2', src: 'https://picsum.photos/200/200?random=2' },
  { photoId: '3', src: 'https://picsum.photos/200/200?random=3' },
  { photoId: '4', src: 'https://picsum.photos/200/200?random=4' },
  { photoId: '5', src: 'https://picsum.photos/200/200?random=5' },
  { photoId: '6', src: 'https://picsum.photos/200/200?random=6' },
];

export const Medium: Story = {
  args: {
    title: '우리의 추억',
    type: 'medium',
    photoList: mockPhotos,
    photoCount: 6,
  },
};

export const Small: Story = {
  args: {
    title: '우리의 추억',
    type: 'small',
    photoList: mockPhotos,
    photoCount: 6,
  },
};

export const FewPhotos: Story = {
  args: {
    title: '짧은 여행',
    type: 'medium',
    photoList: mockPhotos.slice(0, 2),
    photoCount: 2,
  },
};

export const ManyPhotos: Story = {
  args: {
    title: '긴 여행',
    type: 'medium',
    photoList: [
      ...mockPhotos,
      { photoId: '7', src: 'https://picsum.photos/200/200?random=7' },
      { photoId: '8', src: 'https://picsum.photos/200/200?random=8' },
      { photoId: '9', src: 'https://picsum.photos/200/200?random=9' },
      { photoId: '10', src: 'https://picsum.photos/200/200?random=10' },
    ],
    photoCount: 10,
  },
};
