import type { Meta, StoryObj } from '@storybook/react';
import AlbumGridContainer from './AlbumGridContainer';
import AlbumContainer from '../album-container/AlbumContainer';

const meta: Meta<typeof AlbumGridContainer> = {
  title: 'Components/AlbumGridContainer',
  component: AlbumGridContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#242426' }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlbumGridContainer>;

export const Default: Story = {
  render: () => (
    <AlbumGridContainer>
      <AlbumContainer
        title="우리의 추억"
        thumbnailUrls={['https://picsum.photos/200/200?random=1']}
        photoCount={6}
      />
      <AlbumContainer
        title="여름 휴가"
        thumbnailUrls={['https://picsum.photos/200/200?random=1']}
        photoCount={4}
      />
      <AlbumContainer
        title="겨울 여행"
        thumbnailUrls={['https://picsum.photos/200/200?random=1']}
        photoCount={2}
      />
      <AlbumContainer
        title="봄 소풍"
        thumbnailUrls={['https://picsum.photos/200/200?random=1']}
        photoCount={10}
      />
    </AlbumGridContainer>
  ),
};
