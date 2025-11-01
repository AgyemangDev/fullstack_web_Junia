import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const { Search: AntSearch } = Input

function Search() {
  const handleSearch = (value: string) => {
    console.log('Search value:', value)
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
        placeholder="Search..."
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
