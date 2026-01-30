import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/buttons/button/Button';
import Toast from './Toast';
import { ToastProvider, useToast } from './ToastProvider';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Toast>;

const ToastTrigger = ({ message, duration }: { message: string; duration?: number }) => {
  const { showToast } = useToast();

  return <Button text="토스트 보기" onClick={() => showToast(message, duration)} />;
};

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ToastTrigger message="사진이 추가되었습니다" />
    </div>
  ),
};

export const ErrorMessage: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ToastTrigger message="사진 추가에 실패했습니다. 다시 시도해주세요" />
    </div>
  ),
};

export const ShortDuration: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ToastTrigger message="1초 후 사라집니다" duration={1000} />
    </div>
  ),
};

export const LongDuration: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ToastTrigger message="5초 후 사라집니다" duration={5000} />
    </div>
  ),
};

const MultipleToastTrigger = () => {
  const { showToast } = useToast();

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
      <Button text="토스트 1" onClick={() => showToast('첫 번째 토스트')} />
      <Button text="토스트 2" onClick={() => showToast('두 번째 토스트')} />
      <Button text="토스트 3" onClick={() => showToast('세 번째 토스트')} />
    </div>
  );
};

export const MultipleToasts: Story = {
  render: () => <MultipleToastTrigger />,
};
