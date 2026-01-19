import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/buttons/button/Button';
import TextButton from '@/components/buttons/textButton/TextButton';
import Overlay from '@/components/popup/overlay/Overlay';
import usePopup from '@/hooks/usePopup';

const meta: Meta<typeof Overlay> = {
  title: 'Components/Popup/Overlay',
  component: Overlay,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Overlay>;

export const Default: Story = {
  render: () => {
    const { isOpen, handleOpen, handleClose } = usePopup({
      closeOnEscape: false,
      lockScroll: false,
    });

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button text="오버레이 열기" onClick={handleOpen} />
        <Overlay isOpen={isOpen} onClose={handleClose}>
          <Overlay.Content>
            <div>
              <h2>Overlay Example</h2>
              <p>usePopup + Overlay.Content로 동작하는 기본 예시입니다.</p>
            </div>
            <Overlay.Footer>
              <TextButton text="닫기" onClick={handleClose} style={{ flex: 1 }} />
              <TextButton
                text="확인"
                variant="primary"
                onClick={handleClose}
                style={{ flex: 1 }}
              />
            </Overlay.Footer>
          </Overlay.Content>
        </Overlay>
      </div>
    );
  },
};

export const Custom: Story = {
  render: () => {
    const { isOpen, handleOpen, handleClose } = usePopup({
      closeOnEscape: false,
      lockScroll: false,
    });

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button text="오버레이 열기" onClick={handleOpen} />
        <Overlay isOpen={isOpen} onClose={handleClose}>
          <Overlay.Content>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>앨범 초대 링크 공유하기</h3>

              <ul
                style={{
                  paddingLeft: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  fontSize: 14,
                  color: 'white',
                }}
              >
                <li>김야뿌</li>
                <li>김야뿌</li>
                <li>김야뿌</li>
                <li>김야뿌</li>
                <li>김야뿌</li>
                <li>김야뿌</li>
                <li>김야뿌</li>
                <li>김야뿌</li>
                <li>김야뿌</li>
                <li>김야뿌</li>
                <li>김야뿌</li>
              </ul>
            </div>

            <Overlay.Footer>
              <TextButton text="닫기" onClick={handleClose} style={{ flex: 1 }} />
              <TextButton
                text="확인"
                variant="primary"
                onClick={handleClose}
                style={{ flex: 1 }}
              />
            </Overlay.Footer>
          </Overlay.Content>
        </Overlay>
      </div>
    );
  },
};
