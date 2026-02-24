import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/buttons/button/Button';
import TextButton from '@/components/buttons/textButton/TextButton';
import Modal from '@/components/popup/modal/Modal';
import usePopup from '@/hooks/usePopup';

const meta: Meta<typeof Modal> = {
  title: 'Components/Popup/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: function Render() {
    const { isOpen, handleOpen, handleClose } = usePopup();

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button text="모달 열기" onClick={handleOpen} />
        <Modal isOpen={isOpen} onClose={handleClose}>
          <Modal.Content>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2>Modal Example</h2>
              <p>usePopup + Modal.Content로 동작하는 기본 예시입니다.</p>
            </div>
            <Modal.Footer>
              <TextButton text="취소" onClick={handleClose} style={{ flex: 1 }} />
              <TextButton
                text="삭제하기"
                variant="negative"
                onClick={handleClose}
                style={{ flex: 1 }}
              />
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </div>
    );
  },
};
