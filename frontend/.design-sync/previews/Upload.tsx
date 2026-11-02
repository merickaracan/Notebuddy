import { Upload, Button, Icons } from "notebuddy-ui";

const files = [
  { uid: "1", name: "week6-design-patterns.pdf", status: "done" as const },
  { uid: "2", name: "observer-diagram.pptx", status: "done" as const },
  { uid: "3", name: "past-paper-2025.pdf", status: "uploading" as const, percent: 60 },
];

export const AttachFiles = () => (
  <div style={{ width: 360 }}>
    <Upload defaultFileList={files} beforeUpload={() => false}>
      <Button icon={<Icons.UploadOutlined />}>Attach files</Button>
    </Upload>
  </div>
);

export const DragAndDrop = () => (
  <div style={{ width: 420 }}>
    <Upload.Dragger beforeUpload={() => false}>
      <p style={{ fontSize: 40, color: "#0b5ed7", margin: 0 }}><Icons.InboxOutlined /></p>
      <p>Click or drag PDFs and slides here</p>
      <p style={{ color: "rgba(0,0,0,0.45)" }}>Up to 10 MB per file</p>
    </Upload.Dragger>
  </div>
);
