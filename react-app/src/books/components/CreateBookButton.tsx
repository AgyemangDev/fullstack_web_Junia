import { useState } from 'react'
import { BookFormModal } from './BookFormModal'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { CreateBookModel, UpdateBookModel } from '../BookModel'

interface CreateBookButtonProps {
  onCreate: (book: CreateBookModel) => void
}

export function CreateBookButton({ onCreate }: CreateBookButtonProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (book: CreateBookModel | UpdateBookModel) => {
    // In create mode, we always have all required fields
    onCreate(book as CreateBookModel)
    setOpen(false)
  }

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
        onSubmit={handleSubmit}
        mode="create"
      />
    </>
  )
}
