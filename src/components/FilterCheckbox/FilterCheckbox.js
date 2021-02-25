import './FilterCheckbox.css';

function FilterCheckbox({
  isCheckboxChecked,
  onCheckboxChange
}) {
  return (
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        name="filter"
        checked={isCheckboxChecked}
        onChange={onCheckboxChange}
      />
      <svg width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="3" width="34" height="14" rx="7" fill="#C4C4C4"/>
        <circle cx="8" cy="10" r="5" fill="white"/>
      </svg>
      <span className="filter__title">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
