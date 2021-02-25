import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  value,
  error,
  handleChange,
  handleSubmit
}) {
  return (
    <div className="search">
      <form className="search__form" name="search" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          name="movie"
          placeholder="Фильм"
          value={value}
          onChange={handleChange}
        />
        <button
          className="search__button"
          type="submit"
        >
          Найти
        </button>
      </form>
      <span className='search__error'>{error}</span>
      <FilterCheckbox />
    </div>
  );
}

export default SearchForm;
