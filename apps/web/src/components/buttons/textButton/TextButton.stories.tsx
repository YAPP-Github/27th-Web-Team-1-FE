import type { Meta, StoryObj } from '@storybook/react';
import TextButton from '@/components/buttons/textButton/TextButton';

const meta: Meta<typeof TextButton> = {
  title: 'Components/TextButton',
  component: TextButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TextButton>;

export const Default: Story = {
  args: {
    text: 'Default',
    onClick: () => {},
  },
};

export const Primary: Story = {
  args: {
    text: 'Primary',
    variant: 'primary',
    onClick: () => {},
  },
};

export const Negative: Story = {
  args: {
    text: 'Negative',
    variant: 'negative',
    onClick: () => {},
  },
};

export const Disabled: Story = {
  args: {
    text: 'Disabled',
    disabled: true,
    onClick: () => {},
  },
};
