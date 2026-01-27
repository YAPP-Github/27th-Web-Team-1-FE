import Textarea from '@/components/textarea/Textarea';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    value: '',
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Textarea {...args} onChange={(newValue) => updateArgs({ value: newValue })} />
    );
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    name: 'default-textarea',
    placeholder: '내용을 입력하세요',
    max: 500,
  },
};

export const WithError: Story = {
  args: {
    name: 'error-textarea',
    placeholder: '내용을 입력하세요',
    errorMessage: '최소 10자 이상 입력해주세요.',
  },
};
