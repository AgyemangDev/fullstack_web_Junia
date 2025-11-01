import { useEffect, useState } from 'react'
import type { CreateBookModel, UpdateBookModel } from '../BookModel'
import { BookGenre } from '../BookModel'
import { Input, Modal, Select, Space, InputNumber, Switch, Typography } from 'antd'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'

interface BookFormModalProps {
  mode: 'create' | 'edit'
  open: boolean
  onClose: () => void
  onSubmit: (book: CreateBookModel | UpdateBookModel) => void
  initialData?: Partial<CreateBookModel>
}

export function BookFormModal({
  mode,
  open,
  onClose,
  onSubmit,
  initialData = {},
}: BookFormModalProps) {
  const [title, setTitle] = useState(initialData.title || '')
  const [yearPublished, setYearPublished] = useState<number | undefined>(
    initialData.yearPublished
  )
  const [authorId, setAuthorId] = useState<string | undefined>(
    initialData.authorId
  )
  const [genre, setGenre] = useState<keyof typeof BookGenre | undefined>(
    (Object.keys(BookGenre).find(
      k => BookGenre[k as keyof typeof BookGenre] === initialData.genre
    ) as keyof typeof BookGenre) ?? undefined
  )
  const [photoUrl, setPhotoUrl] = useState(initialData.photoUrl || '')
  const [description, setDescription] = useState(initialData.description || '')
  const [isAvailable, setIsAvailable] = useState(
    initialData.isAvailable ?? true
  )
  const [price, setPrice] = useState<number | undefined>(initialData.price)

  const { authors, loadAuthors } = useBookAuthorsProviders()

  useEffect(() => {
    if (open) loadAuthors()
  }, [open, loadAuthors])

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setTitle(initialData.title || '')
      setYearPublished(initialData.yearPublished)
      setAuthorId(initialData.authorId)
      setGenre(
        (Object.keys(BookGenre).find(
          k => BookGenre[k as keyof typeof BookGenre] === initialData.genre
        ) as keyof typeof BookGenre) ?? undefined
      )
      setPhotoUrl(initialData.photoUrl || '')
      setDescription(initialData.description || '')
      setIsAvailable(initialData.isAvailable ?? true)
      setPrice(initialData.price)
    }
  }, [initialData, mode])

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

    onSubmit({
      title,
      yearPublished,
      authorId,
      genre: BookGenre[genre],
      photoUrl,
      description,
      isAvailable,
      price,
    })

    onClose()
  }

  return (
    <Modal
      title={
        <Typography.Title
          level={4}
          style={{ color: '#395E66', margin: 0 }}
        >
          {mode === 'create' ? 'Créer un nouveau livre' : 'Modifier le livre'}
        </Typography.Title>
      }
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={mode === 'create' ? 'Créer' : 'Mettre à jour'}
      okButtonProps={{
        style: {
          backgroundColor: '#395E66',
          borderColor: '#395E66',
        },
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
          placeholder="Titre du livre"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Select
          placeholder="Sélectionner un auteur"
          style={{ width: '100%' }}
          options={authors.map(author => ({
            label: `${author.firstName} ${author.lastName}`,
            value: author.id,
          }))}
          value={authorId}
          onChange={value => setAuthorId(value)}
        />
        <InputNumber
          placeholder="Année de publication"
          style={{ width: '100%' }}
          value={yearPublished}
          onChange={value => setYearPublished(value ?? undefined)}
        />
        <Select
          placeholder="Sélectionner un genre"
          style={{ width: '100%' }}
          options={Object.entries(BookGenre).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
          value={genre}
          onChange={value => setGenre(value)}
        />
        <Input
          placeholder="URL de la photo"
          value={photoUrl}
          onChange={e => setPhotoUrl(e.target.value)}
        />
        <Input.TextArea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />
        <Space>
          <span>Disponible:</span>
          <Switch
            checked={isAvailable}
            onChange={checked => setIsAvailable(checked)}
          />
        </Space>
        <InputNumber
          placeholder="Prix"
          style={{ width: '100%' }}
          value={price}
          onChange={value => setPrice(value ?? undefined)}
          min={0}
        />
      </Space>
    </Modal>
  )
}
