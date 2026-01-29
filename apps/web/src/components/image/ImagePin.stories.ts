import type { Meta, StoryObj } from '@storybook/react';
import TextButton from '@/components/buttons/textButton/TextButton';
import ImagePin from './ImagePin';

const meta: Meta<typeof ImagePin> = {
  title: 'Components/ImagePin',
  component: ImagePin,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ImagePin>;

export const Default: Story = {
  args: {
    imageUrl: 'https://picsum.photos/300/400',
    imageCount: 1,
  },
};

export const WithBadge: Story = {
  args: {
    imageUrl: 'https://picsum.photos/300/400',
    imageCount: 5,
  },
};
