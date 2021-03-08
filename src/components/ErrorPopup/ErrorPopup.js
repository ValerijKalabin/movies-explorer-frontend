import './ErrorPopup.css';

function ErrorPopup({ errorPopupMessage, onClickPopupButton }) {
  return (
    <div className="popup">
      <div className="popup__container">
        <p className="popup__message">{errorPopupMessage}</p>
        <button
          className="popup__button"
          type="button"
          onClick={onClickPopupButton}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default ErrorPopup;
