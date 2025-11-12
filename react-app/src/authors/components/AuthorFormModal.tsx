import { Modal, Form, Input, Typography } from 'antd'
import type { CreateAuthor } from '../providers/useAuthorProvider'

const { Title } = Typography

interface AuthorFormModalProps {
  open: boolean
  title: string
  initialValues?: Partial<CreateAuthor>
  onCancel: () => void
  onSubmit: (values: CreateAuthor) => void | Promise<void>
  okText?: string
}

export const AuthorFormModal = ({
  open,
  title,
  initialValues,
  onCancel,
  onSubmit,
  okText = 'Save',
}: AuthorFormModalProps) => {
  const [form] = Form.useForm<CreateAuthor>()

  const handleFinish = (values: CreateAuthor) => {
    onSubmit(values)
  }

  return (
    <Modal
      open={open}
      title={
        <Title level={4} style={{ color: '#395E66', margin: 0 }}>
          {title}
        </Title>
      }
      onCancel={() => {
        onCancel()
        form.resetFields()
      }}
      onOk={() => form.submit()}
      okText={okText}
      okButtonProps={{
        style: { backgroundColor: '#395E66', borderColor: '#395E66' },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues}
        autoComplete="off"
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'First name is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Last name is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Nationality" name="nationality">
          <Input placeholder="Ex: French" />
        </Form.Item>

        <Form.Item label="Biography" name="biography">
          <Input.TextArea rows={4} placeholder="Author biography..." />
        </Form.Item>

        <Form.Item label="Photo URL" name="photo">
          <Input placeholder="https://..." />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AuthorFormModal
