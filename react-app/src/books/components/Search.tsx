import { useState } from 'react'
import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

interface SearchProps {
  onSearch: (value: string) => void
}

function Search({ onSearch }: SearchProps) {
  const [value, setValue] = useState('')

  const handleSearch = () => {
    onSearch(value.trim())
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: '100%',
        height: '48px', // same as filters
      }}
    >
      <Input
        placeholder="Search by title or author..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onPressEnter={handleSearch}
        allowClear
        style={{
          flex: 1,
          height: '100%',
          fontSize: '16px',
          borderRadius: '8px',
        }}
      />
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={handleSearch}
        style={{
          height: '100%',
          width: '48px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
        }}
      />
    </div>
  )
}

export default Search
