import { useEffect, useState } from 'react'
import { Select, Spin, Typography } from 'antd'
import axios from 'axios'

const { Text } = Typography

interface Member {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface Props {
  onSelect: (member: Member) => void
}

export function MemberSearch({ onSelect }: Props) {
  const [loading, setLoading] = useState(false)
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true)
      try {
        const res = await axios.get('/api/users/role/member')
        setMembers(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMembers()
  }, [])

  return (
    <div style={{ marginBottom: '1rem' }}>
      <Text strong>Select Member</Text>
      <Select
        showSearch
        placeholder="Search or select a member"
        filterOption={(input, option) =>
          (option?.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        style={{ width: '100%' }}
        onChange={value => {
          const member = members.find(m => m.id === value)
          if (member) onSelect(member)
        }}
        loading={loading}
      >
        {members.map(member => (
          <Select.Option key={member.id} value={member.id}>
            {member.firstName} {member.lastName} ({member.email})
          </Select.Option>
        ))}
      </Select>
      {loading && <Spin style={{ marginTop: 10 }} />}
    </div>
  )
}
