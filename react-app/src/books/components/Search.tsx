import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useThemeColors } from '../../hooks/useThemeColors'

const { Search: AntSearch } = Input

interface SearchProps {
  onSearch: (value: string) => void
}

function Search({ onSearch }: SearchProps) {
  const colors = useThemeColors()

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
        className="search-input"
      />

      <style>{`
        .search-input .ant-input {
          background-color: ${colors.inputBg} !important;
          color: ${colors.text} !important;
          border-color: ${colors.border} !important;
        }
        .search-input .ant-input::placeholder {
          color: ${colors.textSecondary} !important;
        }
        .search-input .ant-input-search-button {
          background-color: ${colors.primary} !important;
          border-color: ${colors.primary} !important;
        }
        .search-input .ant-input-clear-icon {
          color: ${colors.text} !important;
        }
      `}</style>
    </div>
  )
}

export default Search
