import CircleButton from '@/components/buttons/circleButton/CircleButton';
import type { Meta, StoryObj } from '@storybook/react';
import CrossHairSvg from '@/assets/images/crossHair.svg';

const meta: Meta<typeof CircleButton> = {
  title: 'Components/CircleButton',
  component: CircleButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CircleButton>;

export const Default: Story = {
  args: {
    children: <CrossHairSvg />,
    onClick: () => {},
  },
};
