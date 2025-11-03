import { useEffect, useState } from 'react'
import type { CreateBookModel, UpdateBookModel } from '../BookModel'
import { BookGenre } from '../BookModel'
import { Button, Input, Modal, Select, Space, InputNumber, Switch } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'

interface CreateBookModalProps {
  onCreate: (book: CreateBookModel) => void
  onUpdate?: (book: UpdateBookModel) => void
}

export function CreateBookModal({
  onCreate,
}: CreateBookModalProps & { buttonProps?: unknown }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [yearPublished, setYearPublished] = useState<number | undefined>()
  const [authorId, setAuthorId] = useState<string | undefined>()
  const [genre, setGenre] = useState<keyof typeof BookGenre | undefined>()
  const [photoUrl, setPhotoUrl] = useState('')
  const [description, setDescription] = useState('')
  const [isAvailable, setIsAvailable] = useState(true)
  const [price, setPrice] = useState<number | undefined>()
  const [numberOfBooks, setNumberOfBooks] = useState<number>(0)

  const { authors, loadAuthors } = useBookAuthorsProviders()

  const onClose = () => {
    setTitle('')
    setYearPublished(undefined)
    setAuthorId(undefined)
    setGenre(undefined)
    setPhotoUrl('')
    setDescription('')
    setIsAvailable(true)
    setPrice(undefined)
    setNumberOfBooks(0)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) loadAuthors()
  }, [isOpen, loadAuthors])

  const handleSubmit = () => {
    if (
      !title ||
      !authorId ||
      !yearPublished ||
      !genre ||
      !photoUrl ||
      !description ||
      price === undefined
    )
      return

    onCreate({
      title,
      yearPublished,
      authorId,
      genre: BookGenre[genre],
      photoUrl,
      description,
      isAvailable,
      price,
      numberOfBooks,
    })
    onClose()
  }

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Create Book
      </Button>

      <Modal
        title="Create New Book"
        open={isOpen}
        onCancel={onClose}
        onOk={handleSubmit}
        okButtonProps={{
          disabled:
            !title ||
            !authorId ||
            !yearPublished ||
            !genre ||
            !photoUrl ||
            !description ||
            price === undefined,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Book Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <Select
            placeholder="Select Author"
            style={{ width: '100%' }}
            options={authors.map(author => ({
              label: `${author.firstName} ${author.lastName}`,
              value: author.id,
            }))}
            value={authorId}
            onChange={value => setAuthorId(value)}
          />

          <InputNumber
            placeholder="Year Published"
            style={{ width: '100%' }}
            value={yearPublished}
            onChange={value => setYearPublished(value ?? undefined)}
          />

          <Select
            placeholder="Select Genre"
            style={{ width: '100%' }}
            options={Object.entries(BookGenre).map(([key, value]) => ({
              label: value,
              value: key,
            }))}
            value={genre}
            onChange={value => setGenre(value)}
          />

          <Input
            placeholder="Photo URL"
            value={photoUrl}
            onChange={e => setPhotoUrl(e.target.value)}
          />

          <Input.TextArea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
          />

          <InputNumber
            placeholder="Number of books in stock"
            style={{ width: '100%' }}
            value={numberOfBooks}
            onChange={value => setNumberOfBooks(value ?? 0)}
            min={0}
          />

          <Space>
            <span>Available for borrowing:</span>
            <Switch
              checked={isAvailable}
              onChange={checked => setIsAvailable(checked)}
            />
          </Space>

          <InputNumber
            placeholder="Price"
            style={{ width: '100%' }}
            value={price}
            onChange={value => setPrice(value ?? undefined)}
            min={0}
            prefix="$"
            precision={2}
          />
        </Space>
      </Modal>
    </>
  )
}
