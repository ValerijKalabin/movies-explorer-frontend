import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';
import { NEED_ENTER_KEYWORD } from '../../utils/constants';

function SearchForm({
  onSearchSubmit,
  isCheckboxChecked,
  onCheckboxChange
}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const valueTrim = value.trim();
    setValue(valueTrim);
    if(!valueTrim) {
      setError(NEED_ENTER_KEYWORD);
    } else {
      setError('');
      onSearchSubmit(valueTrim);
    }
  }

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
      <FilterCheckbox
        isCheckboxChecked={isCheckboxChecked}
        onCheckboxChange={onCheckboxChange}
      />
    </div>
  );
}

export default SearchForm;
