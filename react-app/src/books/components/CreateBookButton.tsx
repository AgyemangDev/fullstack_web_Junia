import { useState } from 'react'
import { BookFormModal } from './BookFormModal'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { CreateBookModel } from '../BookModel'
import { useThemeColors } from '../../hooks/useThemeColors'

interface CreateBookButtonProps {
  onCreate: (book: CreateBookModel) => void
}

export function CreateBookButton({ onCreate }: CreateBookButtonProps) {
  const colors = useThemeColors()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setOpen(true)}
        style={{
          backgroundColor: colors.primary,
          borderColor: colors.primary,
          fontWeight: 600,
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
