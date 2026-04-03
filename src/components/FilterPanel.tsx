import { categories } from '../data/categories';
import { genres } from '../data/genres';

interface FilterPanelProps {
  search: string;
  platform: string;
  genre: string;
  onSearchChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onGenreChange: (value: string) => void;
}

const FilterPanel = ({
  search,
  platform,
  genre,
  onSearchChange,
  onPlatformChange,
  onGenreChange,
}: FilterPanelProps) => {
  return (
    <div className="filter-panel card">
      <div className="filter-group">
        <label>Поиск</label>
        <input
          type="text"
          value={search}
          placeholder="Введите название игры"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
       <div className="filter-group">
        <label>Платформа</label>
        <select value={platform} onChange={(e) => onPlatformChange(e.target.value)}>
          <option value="all">Все платформы</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Жанр</label>
        <select value={genre} onChange={(e) => onGenreChange(e.target.value)}>
          <option value="all">Все жанры</option>
          {genres.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;