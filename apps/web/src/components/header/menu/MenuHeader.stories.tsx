import type { Meta, StoryObj } from '@storybook/react';
import MenuHeader from './MenuHeader';

const meta: Meta<typeof MenuHeader> = {
  title: 'Components/Header/MenuHeader',
  component: MenuHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof MenuHeader>;

export const Default: Story = {
  args: {
    title: '앨범 이름',
    onClickBack: () => console.log('뒤로가기'),
  },
};

export const WithMenu: Story = {
  render: () => (
    <MenuHeader title="앨범 이름" onClickBack={() => console.log('뒤로가기')}>
      <MenuHeader.Menu>
        <MenuHeader.Item onClick={() => console.log('편집')}>편집</MenuHeader.Item>
        <MenuHeader.Item onClick={() => console.log('삭제')} variant="danger">
          삭제
        </MenuHeader.Item>
      </MenuHeader.Menu>
    </MenuHeader>
  ),
};

export const WithLocation: Story = {
  args: {
    title: '앨범 이름',
    onClickBack: () => console.log('뒤로가기'),
    showLocation: true,
  },
};
