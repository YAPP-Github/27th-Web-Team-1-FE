import type { Meta, StoryObj } from '@storybook/react';
import MapPinSvg from '@/assets/images/mapPin.svg';
import FloatingButton from '@/components/buttons/floatingButton/FloatingButton';

const meta: Meta<typeof FloatingButton> = {
  title: 'Components/FloatingButton',
  component: FloatingButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FloatingButton>;

export const Default: Story = {
  args: {
    text: '위치로 이동',
    onClick: () => {},
  },
};

export const WithIcon: Story = {
  args: {
    text: '위치로 이동',
    icon: <MapPinSvg />,
    onClick: () => {},
  },
};
