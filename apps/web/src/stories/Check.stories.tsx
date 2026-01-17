import type { Meta, StoryObj } from '@storybook/react';
import Check from '@/components/buttons/check/Check';

const meta: Meta<typeof Check> = {
  title: 'Components/Check',
  component: Check,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Check>;

export const Checked: Story = {
  args: {
    checked: true,
    onChange: () => {},
  },
};

export const UnChecked: Story = {
  args: {
    checked: false,
    onChange: () => {},
  },
};
