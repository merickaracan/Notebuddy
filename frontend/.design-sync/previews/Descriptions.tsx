import { Descriptions, Tag } from "notebuddy-ui";

export const NoteDetails = () => (
  <div style={{ width: 640 }}>
    <Descriptions title="Note details" bordered column={2}>
      <Descriptions.Item label="Title">Dijkstra's algorithm</Descriptions.Item>
      <Descriptions.Item label="Module">CM22008</Descriptions.Item>
      <Descriptions.Item label="Author">at2201@bath.ac.uk</Descriptions.Item>
      <Descriptions.Item label="Status"><Tag color="green">Verified</Tag></Descriptions.Item>
      <Descriptions.Item label="Average rating">4.6 (18 ratings)</Descriptions.Item>
      <Descriptions.Item label="Attachments">2 files</Descriptions.Item>
    </Descriptions>
  </div>
);

export const Profile = () => (
  <div style={{ width: 480 }}>
    <Descriptions title="Profile" column={1}>
      <Descriptions.Item label="Name">Ava Thompson</Descriptions.Item>
      <Descriptions.Item label="Email">at2201@bath.ac.uk</Descriptions.Item>
      <Descriptions.Item label="Role">Student</Descriptions.Item>
      <Descriptions.Item label="Points">340</Descriptions.Item>
    </Descriptions>
  </div>
);
