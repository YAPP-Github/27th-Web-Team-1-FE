import PhotoGridItem from '@/components/photoGridItem/PhotoGridItem';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PhotoGridItem> = {
  title: 'Components/PhotoGridItem',
  component: PhotoGridItem,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PhotoGridItem>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/118/157',
    date: '2024-01-15T00:00:00.000Z',
    alt: 'Sample photo',
  },
};

export const WithoutAlt: Story = {
  args: {
    src: 'https://picsum.photos/118/157',
    date: '2024-12-25T00:00:00.000Z',
  },
};

export const BrokenImage: Story = {
  args: {
    src: '',
    date: '2024-03-08T00:00:00.000Z',
    alt: 'Broken image',
  },
};
