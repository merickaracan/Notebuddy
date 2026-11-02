import { Steps } from "notebuddy-ui";

export const CreateNoteFlow = () => (
  <div style={{ width: 600 }}>
    <Steps current={1} items={[{ title: "Details", description: "Title and module" }, { title: "Write", description: "Note content" }, { title: "Attach", description: "Optional files" }, { title: "Publish" }]} />
  </div>
);

export const Verification = () => (
  <div style={{ width: 280 }}>
    <Steps direction="vertical" size="small" current={2} items={[{ title: "Submitted" }, { title: "Reviewed by lecturer" }, { title: "Verified" }]} />
  </div>
);
