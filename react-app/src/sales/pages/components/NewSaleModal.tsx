import { useEffect, useState, useCallback } from 'react'
import { Modal, Form, Select, Typography, message } from 'antd'
import type { FormInstance } from 'antd'
import { useBookProvider } from '../../../books/providers/useBookProvider'
import { useSaleProvider } from '../../providers/useSaleProvider'
import type { BookModel } from '../../../books/BookModel'

const { Title, Text } = Typography

interface Member {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

interface NewSaleFormValues {
  buyerId: string
  bookId: string
}

interface NewSaleModalProps {
  open: boolean
  onClose: () => void
  availableBooks: BookModel[]
  onSubmit: (values: NewSaleFormValues) => Promise<void>
}

export function NewSaleModal({
  open,
  onClose,
  availableBooks,
  onSubmit,
}: NewSaleModalProps) {
  const [form]: [FormInstance<NewSaleFormValues>] = Form.useForm()
  const { fetchMembers } = useSaleProvider()
  const { loadBooks } = useBookProvider()

  const [members, setMembers] = useState<Member[]>([])
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [loading, setLoading] = useState(false)

  const loadMembers = useCallback(async (): Promise<void> => {
    try {
      const data = await fetchMembers()
      setMembers(data)
    } catch (error) {
      console.error('Error loading members:', error)
      message.error('Failed to load members')
    }
  }, [fetchMembers])

  useEffect(() => {
    if (open) {
      void loadBooks()
      void loadMembers()
    }
  }, [open, loadBooks, loadMembers])

  const handleMemberChange = (memberId: string): void => {
    const member = members.find(m => m.id === memberId)
    setSelectedMember(member ?? null)
  }

  const handleSubmit = async (values: NewSaleFormValues): Promise<void> => {
    setLoading(true)
    try {
      await onSubmit(values)
      form.resetFields()
      onClose()
    } catch (error) {
      console.error('Error recording sale:', error)
      message.error('Error recording sale')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = (): void => {
    form.resetFields()
    setSelectedMember(null)
    onClose()
  }

  return (
    <Modal
      title={<Title level={4}>New Sale</Title>}
      open={open}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okButtonProps={{
        style: { backgroundColor: '#395E66', borderColor: '#395E66' },
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Search Member"
          name="buyerId"
          rules={[{ required: true, message: 'Please select a member' }]}
        >
          <Select
            showSearch
            placeholder="Select a member"
            optionFilterProp="label"
            onChange={handleMemberChange}
            options={members.map(member => ({
              value: member.id,
              label: `${member.firstName} ${member.lastName} (${member.email})`,
            }))}
            filterOption={(input, option) =>
              (option?.label ?? '')
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>

        {selectedMember && (
          <div style={{ marginBottom: '1rem' }}>
            <Text strong>Member Info:</Text>
            <div>
              Name: {selectedMember.firstName} {selectedMember.lastName}
            </div>
            <div>Email: {selectedMember.email}</div>
          </div>
        )}

        <Form.Item
          label="Book"
          name="bookId"
          rules={[{ required: true, message: 'Please select a book' }]}
        >
          <Select
            placeholder="Select a book"
            options={availableBooks.map(book => ({
              value: book.id,
              label: `${book.title} - ${book.author.firstName} ${book.author.lastName}`,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
