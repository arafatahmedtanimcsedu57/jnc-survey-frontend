// import { NotificationTwoTone } from "@ant-design/icons";
// import { Button } from "antd";

import { Button } from "@mui/material";
import { SendGroupNotificationType } from "../../types/GroupType";

export const groupsColumns = ({
  setOpenModal,
}: {
  setOpenModal: ({
    data,
    isOpen,
  }: {
    data: SendGroupNotificationType;
    isOpen: boolean;
  }) => void;
}) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text: string) => {
      return <span className="text-lg">{text}</span>;
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => {
      return <span className="text-lg">{text}</span>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (data: { id: number; name: string }) => {
      return (
        <Button
          onClick={() =>
            setOpenModal({ data: { group: data?.name || "" }, isOpen: true })
          }
          variant="outlined"
        >
          {/* Send Notification <NotificationTwoTone /> */}
          Send Notification
        </Button>
      );
    },
  },
];
