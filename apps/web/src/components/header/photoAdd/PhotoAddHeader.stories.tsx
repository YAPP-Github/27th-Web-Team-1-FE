import type { Meta, StoryObj } from '@storybook/react';
import PhotoAddHeader from './PhotoAddHeader';
import * as S from './PhotoAddHeader.styles';
import CloseIcon from '@/assets/images/close.svg';

const meta: Meta<typeof PhotoAddHeader> = {
  title: 'Components/Header/PhotoAddHeader',
  component: PhotoAddHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#242426' }],
    },
  },
};

export default meta;

type Story = StoryObj<typeof PhotoAddHeader>;

const CloseButtonElement = (
  <S.CloseButton onClick={() => console.log('닫기')}>
    <CloseIcon width={22} height={22} />
  </S.CloseButton>
);

export const WithLocation: Story = {
  render: () => (
    <PhotoAddHeader
      left={CloseButtonElement}
      locationText="서울특별시 강남구 역삼동"
      hasLocation={true}
      isLoading={false}
    />
  ),
};

export const WithoutLocation: Story = {
  render: () => (
    <PhotoAddHeader left={CloseButtonElement} hasLocation={false} isLoading={false} />
  ),
};

export const Loading: Story = {
  render: () => (
    <PhotoAddHeader left={CloseButtonElement} hasLocation={true} isLoading={true} />
  ),
};
