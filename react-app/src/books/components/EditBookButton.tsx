import { useState } from 'react'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { BookFormModal } from './BookFormModal'
import type { BookModel, UpdateBookModel } from '../BookModel'

interface EditBookButtonProps {
  book: BookModel
  onUpdate: (id: string, input: UpdateBookModel) => void
}

export function EditBookButton({ book, onUpdate }: EditBookButtonProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (updatedData: UpdateBookModel) => {
    onUpdate(book.id, updatedData)
    setOpen(false)
  }

  return (
    <>
      <Button
        icon={<EditOutlined />}
        onClick={() => setOpen(true)}
        size="middle"
        style={{
          backgroundColor: '#395E66',
          borderColor: '#395E66',
          color: 'white',
        }}
      >
        Edit
      </Button>

      <BookFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        mode="edit"
        initialData={{
          ...book,
          description: book.description ?? undefined,
        }}
      />
    </>
  )
}
