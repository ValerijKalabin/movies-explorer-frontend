import './ErrorPopup.css';

function ErrorPopup({ errorPopupMessage, onClickButtonErrorPopup }) {
  return (
    <div className="popup">
      <div className="popup__container">
        <p className="popup__message">{errorPopupMessage}</p>
        <button
          className="popup__button"
          type="button"
          onClick={onClickButtonErrorPopup}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default ErrorPopup;
