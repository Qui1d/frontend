import { categories } from '../data/categories';

interface SidebarCategoriesProps {
  selected?: string;
  onSelect?: (value: string) => void;
}

const SidebarCategories = ({ selected, onSelect }: SidebarCategoriesProps) => {
  return (
    <aside className="sidebar-card">
      <h3>Разделы</h3>
      <ul className="sidebar-list">
        <li>
          <button
            className={selected === 'all' ? 'sidebar-list__active' : ''}
            onClick={() => onSelect?.('all')}
          >
            Все платформы
          </button>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <button
              className={selected === category ? 'sidebar-list__active' : ''}
              onClick={() => onSelect?.(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarCategories;