import { Modal, Typography } from "notebuddy-ui";

// Modal is position: fixed; the transformed frame contains it so the open state shows in place.
const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ position: "relative", width: 600, height: 320, transform: "translateZ(0)", overflow: "hidden" }}>{children}</div>
);

export const DeleteNote = () => (
  <Frame>
    <Modal open centered title="Delete this note?" okText="Delete" okButtonProps={{ danger: true }} cancelText="Cancel" getContainer={false} width={440}>
      <Typography.Paragraph>
        “Observer pattern summary” and its 2 attachments will be permanently removed. Ratings and comments will be lost.
      </Typography.Paragraph>
    </Modal>
  </Frame>
);
