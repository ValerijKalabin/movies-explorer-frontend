import './SearchForm.css';

function SearchForm() {
  return (
    <div className="search">
      <form className="search__form" name="search">
        <input
          className="search__input"
          type="text"
          name="movie"
          placeholder="Фильм"
        />
        <button
          className="search__button"
          type="submit"
        >
          Найти
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
