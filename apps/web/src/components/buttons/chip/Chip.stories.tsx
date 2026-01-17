import Chip from '@/components/buttons/chip/Chip';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    text: 'Chip',
    size: 'medium',
  },
};

export const Black: Story = {
  args: {
    text: 'Black Chip',
    variant: 'black',
    size: 'medium',
  },
};

export const White: Story = {
  args: {
    text: 'White Chip',
    variant: 'white',
    size: 'medium',
  },
};

export const WithIcon: Story = {
  args: {
    text: 'Location',
    size: 'medium',
    showIcon: true,
  },
};

export const WithCancel: Story = {
  args: {
    text: 'Removable',
    size: 'medium',
    onCancel: () => {},
  },
};

export const WithIconAndCancel: Story = {
  args: {
    text: 'Filter',
    size: 'medium',
    showIcon: true,
    onCancel: () => {},
  },
};

export const Small: Story = {
  args: {
    text: 'Small Chip',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    text: 'Medium Chip',
    size: 'medium',
  },
};
