export const userColumns = () => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => {
      return <span className="text-lg">{text}</span>;
    },
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    render: (text: string) => {
      return <span className="text-lg">{text}</span>;
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "address",
    render: (text: string) => {
      return <span className="text-lg">{text}</span>;
    },
  },
  {
    title: "Group",
    dataIndex: "group",
    key: "group",
    render: (text: string[]) => {
      return <span className="text-lg">{text.join(", ")}</span>;
    },
  },
];
