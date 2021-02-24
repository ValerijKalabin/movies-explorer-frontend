import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className="false">
      <div className="false__container">
        <h1 className="false__title">404</h1>
        <p className="false__subtitle">Страница не найдена</p>
      </div>
      <button className="false__button" type='button'>Назад</button>
    </div>
  );
}

export default PageNotFound;
