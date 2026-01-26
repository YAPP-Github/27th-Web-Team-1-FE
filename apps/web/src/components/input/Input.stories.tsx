import Input from '@/components/input/Input';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    value: '',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['input', 'search'],
    },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <Input {...args} onChange={(newValue) => updateArgs({ value: newValue })} />;
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    name: 'default-input',
    placeholder: '텍스트를 입력하세요',
    max: 100,
  },
};

export const Search: Story = {
  args: {
    name: 'search-input',
    type: 'search',
    placeholder: '검색어를 입력하세요',
    max: 50,
  },
};

export const WithError: Story = {
  args: {
    name: 'error-input',
    placeholder: '텍스트를 입력하세요',
    errorMessage: '필수 입력 항목입니다.',
  },
};

export const SearchWithError: Story = {
  args: {
    name: 'search-error-input',
    type: 'search',
    placeholder: '검색어를 입력하세요',
    errorMessage: '검색어를 입력해주세요.',
  },
};
