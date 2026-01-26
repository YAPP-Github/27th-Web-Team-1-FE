import PhotoGridContainer from '@/components/photoGridContainer/PhotoGridContainer';
import PhotoGridItem from '@/components/photoGridItem/PhotoGridItem';
import type { Meta, StoryObj } from '@storybook/react';

const handleClick = () => {};

const meta: Meta<typeof PhotoGridContainer> = {
  title: 'Components/PhotoGridContainer',
  component: PhotoGridContainer,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PhotoGridContainer>;

export const Default: Story = {
  render: () => (
    <PhotoGridContainer>
      {Array.from({ length: 9 }).map((_, i) => (
        <PhotoGridItem
          key={i}
          src={`https://picsum.photos/118/157?random=${i}`}
          date={`2024-01-${String(i + 1).padStart(2, '0')}T00:00:00.000Z`}
          alt={`Photo ${i + 1}`}
          onClick={handleClick}
        />
      ))}
    </PhotoGridContainer>
  ),
};

export const WithBrokenImages: Story = {
  render: () => (
    <PhotoGridContainer>
      <PhotoGridItem
        src="https://picsum.photos/118/157?random=1"
        date="2024-01-01T00:00:00.000Z"
        onClick={handleClick}
      />
      <PhotoGridItem
        src=""
        date="2024-01-02T00:00:00.000Z"
        alt="Broken"
        onClick={handleClick}
      />
      <PhotoGridItem
        src="https://picsum.photos/118/157?random=3"
        date="2024-01-03T00:00:00.000Z"
        onClick={handleClick}
      />
      <PhotoGridItem
        src=""
        date="2024-01-04T00:00:00.000Z"
        alt="No image"
        onClick={handleClick}
      />
      <PhotoGridItem
        src="https://picsum.photos/118/157?random=5"
        date="2024-01-05T00:00:00.000Z"
        onClick={handleClick}
      />
      <PhotoGridItem
        src="https://picsum.photos/118/157?random=6"
        date="2024-01-06T00:00:00.000Z"
        onClick={handleClick}
      />
    </PhotoGridContainer>
  ),
};
