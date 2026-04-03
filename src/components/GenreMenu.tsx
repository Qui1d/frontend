import { genres } from '../data/genres';

interface GenreMenuProps {
  selected?: string;
  onSelect?: (value: string) => void;
}

const GenreMenu = ({ selected, onSelect }: GenreMenuProps) => {
  return (
    <section className="card">
      <h3 className="section-title">Жанры</h3>
      <div className="genre-menu">
        <button
          className={selected === 'all' ? 'genre-menu__active' : ''}
          onClick={() => onSelect?.('all')}
        >
          Все
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            className={selected === genre ? 'genre-menu__active' : ''}
            onClick={() => onSelect?.(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </section>
  );
};

export default GenreMenu;