import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const { Search: AntSearch } = Input

interface SearchProps {
  onSearch: (value: string) => void
}

function Search({ onSearch }: SearchProps) {
  const handleSearch = (value: string) => {
    onSearch(value)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '1rem',
      }}
    >
      <AntSearch
        placeholder="Rechercher par titre ou auteur..."
        allowClear
        enterButton={<SearchOutlined />}
        onSearch={handleSearch}
        style={{
          maxWidth: 600,
          width: '100%',
        }}
      />
    </div>
  )
}

export default Search
