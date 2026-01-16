import Button from '@/components/button/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: '버튼',
  },
};

export const Primary: Story = {
  args: {
    text: 'Primary 버튼',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    text: 'Secondary 버튼',
    variant: 'secondary',
  },
};

export const Highlight: Story = {
  args: {
    text: 'Highlight 버튼',
    variant: 'highlight',
  },
};

export const Small: Story = {
  args: {
    text: 'Small 버튼',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    text: 'Medium 버튼',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    text: 'Large 버튼',
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    text: '비활성화 버튼',
    disabled: true,
  },
};
