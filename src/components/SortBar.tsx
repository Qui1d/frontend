interface SortBarProps {
  sort: string;
  onSortChange: (value: string) => void;
}

const SortBar = ({ sort, onSortChange }: SortBarProps) => {
  return (
    <div className="sort-bar card">
      <label>Сортировка</label>
      <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="default">По умолчанию</option>
        <option value="price-asc">По цене ↑</option>
        <option value="price-desc">По цене ↓</option>
        <option value="discount-desc">По скидке</option>
        <option value="title-asc">По названию</option>
      </select>
    </div>
  );
};

export default SortBar;