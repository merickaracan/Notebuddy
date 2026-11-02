import { Result, Button } from "notebuddy-ui";

export const NotePublished = () => (
  <Result
    status="success"
    title="Note published"
    subTitle="“Observer pattern summary” is now visible to everyone taking CM22007."
    extra={[<Button type="primary" key="view">View note</Button>, <Button key="new">Create another</Button>]}
  />
);

export const NotFound = () => (
  <Result status="404" title="Note not found" subTitle="This note may have been deleted by its author." extra={<Button type="primary">Back to dashboard</Button>} />
);

export const NoAccess = () => (
  <Result status="403" title="Lecturers only" subTitle="Only lecturers can verify notes." />
);
