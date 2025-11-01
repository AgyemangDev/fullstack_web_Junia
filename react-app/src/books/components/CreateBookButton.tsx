import { useState } from "react";
import { BookFormModal } from "./BookFormModal";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";


export function CreateBookButton({ onCreate }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setOpen(true)}
      >
        Create Book
      </Button>

      <BookFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onCreate}
        mode="create"
      />
    </>
  );
}
