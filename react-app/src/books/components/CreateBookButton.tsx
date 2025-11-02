import { useState } from 'react'
import { BookFormModal } from './BookFormModal'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { CreateBookModel } from '../BookModel'

interface CreateBookButtonProps {
  onCreate: (book: CreateBookModel) => void
}

export function CreateBookButton({ onCreate }: CreateBookButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setOpen(true)}
        style={{
          backgroundColor: '#395E66',
          borderColor: '#395E66',
        }}
      >
        Add a Book
      </Button>

      <BookFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onCreate}
        mode="create"
      />
    </>
  )
}
